import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AppWebsocketGateway } from '../websocket/app-websocket.gateway';

@Injectable()
export class HousekeepingService {
  constructor(
    private prisma: PrismaService,
    private websocketGateway: AppWebsocketGateway
  ) {}

  async getStats(businessId: string) {
    if (!businessId) return { dirtyRooms: 0, cleanRooms: 0, pendingInspections: 0, openTasks: 0, staffOnDuty: 0 };
    const dirtyRoomsCount = await this.prisma.room.count({ where: { businessId, housekeepingStatus: 'DIRTY' } });
    const cleanRoomsCount = await this.prisma.room.count({ where: { businessId, housekeepingStatus: 'CLEAN' } });
    const inspectionCount = await this.prisma.room.count({ where: { businessId, housekeepingStatus: 'INSPECTION' } });
    const openTasks = await this.prisma.housekeepingTask.count({ where: { businessId, status: { in: ['PENDING', 'IN_PROGRESS'] } } });
    const staffOnDuty = await this.prisma.user.count();

    return {
      dirtyRooms: dirtyRoomsCount,
      cleanRooms: cleanRoomsCount,
      pendingInspections: inspectionCount,
      openTasks: openTasks,
      staffOnDuty: staffOnDuty 
    };
  }

  async getRooms(businessId: string) {
    if (!businessId) return [];
    const rooms = await this.prisma.room.findMany({ where: { businessId }, include: { roomType: true } });
    const activeStays = await this.prisma.stay.findMany({
      where: { businessId, status: 'CHECKED_IN' },
      include: { reservation: { include: { reservationRooms: true } } }
    });
    
    // Simplistic mapping for now to find if room is occupied
    const occupiedRoomIds = activeStays.flatMap(s => s.reservation.reservationRooms.map(rr => rr.roomId));

    return rooms.map(r => ({
      id: r.id,
      number: r.roomNumber,
      type: r.roomType?.name || 'Standard',
      status: r.housekeepingStatus,
      occupancy: occupiedRoomIds.includes(r.id) ? 'OCCUPIED' : 'VACANT',
      priority: 'NORMAL',
      assignedTo: null
    }));
  }

  async getTasks(businessId: string) {
    if (!businessId) return [];
    const tasks = await this.prisma.housekeepingTask.findMany({
      where: { businessId },
      orderBy: { priority: 'desc' }
    });

    return tasks.map(t => ({
      id: t.id,
      roomNumber: t.roomId || 'N/A',
      taskType: t.taskType,
      priority: t.priority,
      status: t.status,
      assignedTo: t.assignedEmployeeId,
      estimatedMinutes: 30
    }));
  }

  async createTask(businessId: string, data: any) {
    let branch = await this.prisma.branch.findFirst({ where: { businessId } });
    const task = await this.prisma.housekeepingTask.create({
      data: {
        businessId: businessId,
        branchId: branch?.id as string,
        taskNumber: `TSK-${Math.floor(1000 + Math.random() * 9000)}`,
        roomId: data.roomId,
        taskType: data.taskType || 'CLEANING',
        priority: data.priority || 'NORMAL',
        status: 'PENDING',
        assignedEmployeeId: data.assignedTo || null,
        dueAt: new Date(),
      }
    });

    this.websocketGateway.server.emit('housekeeping.task.updated', { taskId: task.id });
    return task;
  }

  async updateTaskStatus(id: string, status: string) {
    const task = await this.prisma.housekeepingTask.update({
      where: { id },
      data: { status }
    });

    if (task.roomId && status === 'COMPLETED') {
      await this.prisma.room.update({
        where: { id: task.roomId },
        data: { housekeepingStatus: 'CLEAN' }
      });
      this.websocketGateway.server.emit('housekeeping.room.updated', { roomId: task.roomId });
    }

    this.websocketGateway.server.emit('housekeeping.task.updated', { taskId: task.id });
    return task;
  }

  async getInspections(businessId: string) {
    if (!businessId) return [];
    return await this.prisma.roomInspection.findMany({
      where: { businessId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getStayOver(businessId: string) {
    if (!businessId) return [];
    return await this.prisma.stayOverService.findMany({
      where: { businessId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getLinenItems(businessId: string) {
    if (!businessId) return [];
    return await this.prisma.linenItem.findMany({ where: { businessId } });
  }

  async getLinenMovements(businessId: string) {
    if (!businessId) return [];
    return await this.prisma.linenMovement.findMany({
      where: { businessId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async createLinenMovement(businessId: string, userId: string, data: any) {
    let branch = await this.prisma.branch.findFirst({ where: { businessId } });
    const mov = await this.prisma.linenMovement.create({
      data: {
        businessId: businessId,
        branchId: branch?.id as string,
        linenItemId: data.linenItemId,
        quantity: parseInt(data.quantity) || 1,
        fromLocationId: data.fromLocation,
        toLocationId: data.toLocation,
        movementType: data.type || 'ISSUE',
        createdByUserId: userId,
        reason: data.referenceId
      }
    });
    this.websocketGateway.server.emit('housekeeping.linen.updated', { movementId: mov.id });
    return mov;
  }

  async getLostAndFound(businessId: string) {
    if (!businessId) return [];
    return await this.prisma.lostAndFoundItem.findMany({
      where: { businessId },
      orderBy: { foundAt: 'desc' }
    });
  }

  async createLostAndFound(businessId: string, userId: string, data: any) {
    let branch = await this.prisma.branch.findFirst({ where: { businessId } });
    const lf = await this.prisma.lostAndFoundItem.create({
      data: {
        businessId: businessId,
        branchId: branch?.id as string,
        itemNumber: `LF-${Math.floor(1000 + Math.random() * 9000)}`,
        description: data.description || data.itemName || 'Unknown Item',
        category: data.category || 'OTHER',
        foundAt: new Date(),
        storageLocation: data.locationFound,
        roomId: data.roomId || null,
        foundByEmployeeId: userId,
        status: 'FOUND'
      }
    });
    this.websocketGateway.server.emit('housekeeping.lostfound.updated', { id: lf.id });
    return lf;
  }

  async getReports(businessId: string) {
    if (!businessId) return { productivity: 100, totalCleaned: 0, totalPending: 0 };
    const totalTasks = await this.prisma.housekeepingTask.count({ where: { businessId } });
    const completedTasks = await this.prisma.housekeepingTask.count({ where: { businessId, status: 'COMPLETED' } });
    
    return {
      productivity: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 100,
      totalCleaned: completedTasks,
      totalPending: totalTasks - completedTasks
    };
  }
}
