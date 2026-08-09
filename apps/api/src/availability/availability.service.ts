import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AvailabilityService {
  constructor(private readonly prisma: PrismaService) {}

  async checkAvailability(query: { arrivalDate: string; departureDate: string; numberOfRooms: number; adults: number; children: number }) {
    // Basic implementation: Return all room types and their total inventory (not accounting for existing reservations yet)
    // For a real production app, we would query RoomBlocks and ReservationRoom overlapping dates
    const roomTypes = await this.prisma.roomType.findMany({
      include: { rooms: true }
    });

    const nights = Math.max(1, Math.floor((new Date(query.departureDate).getTime() - new Date(query.arrivalDate).getTime()) / (1000 * 60 * 60 * 24)));

    return roomTypes.map(rt => ({
      id: rt.id,
      name: rt.name,
      available: rt.rooms.filter(r => r.operationalStatus === 'AVAILABLE').length,
      maxAdults: rt.maximumAdults,
      maxChildren: rt.maximumChildren,
      bedType: rt.bedType,
      amenities: rt.amenities ? JSON.parse(rt.amenities) : [],
      basePrice: rt.basePrice,
      nights,
      estimatedTotal: rt.basePrice * nights * (query.numberOfRooms || 1)
    }));
  }
}
