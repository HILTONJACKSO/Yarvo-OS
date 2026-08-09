import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const GLOBAL_PERMISSIONS = [
  { code: 'staff.view', name: 'View Staff', resource: 'staff', action: 'view' },
  { code: 'staff.create', name: 'Create Staff', resource: 'staff', action: 'create' },
  { code: 'staff.update', name: 'Update Staff', resource: 'staff', action: 'update' },
  { code: 'staff.suspend', name: 'Suspend Staff', resource: 'staff', action: 'suspend' },
  { code: 'roles.view', name: 'View Roles', resource: 'roles', action: 'view' },
  { code: 'roles.create', name: 'Create Roles', resource: 'roles', action: 'create' },
  { code: 'roles.update', name: 'Update Roles', resource: 'roles', action: 'update' },
  { code: 'branches.view', name: 'View Branches', resource: 'branches', action: 'view' },
  { code: 'branches.update', name: 'Update Branches', resource: 'branches', action: 'update' },
  { code: 'dashboard.view', name: 'View Dashboard', resource: 'dashboard', action: 'view' },
  { code: 'settings.manage', name: 'Manage Settings', resource: 'settings', action: 'manage' },
  { code: 'rooms.view', name: 'View Rooms', resource: 'rooms', action: 'view' },
  { code: 'rooms.create', name: 'Create Rooms', resource: 'rooms', action: 'create' },
  { code: 'bookings.create', name: 'Create Bookings', resource: 'bookings', action: 'create' },
  { code: 'orders.create', name: 'Create Orders', resource: 'orders', action: 'create' },
  { code: 'payments.receive', name: 'Receive Payments', resource: 'payments', action: 'receive' },
  { code: 'refunds.approve', name: 'Approve Refunds', resource: 'refunds', action: 'approve' },
  { code: 'inventory.adjust', name: 'Adjust Inventory', resource: 'inventory', action: 'adjust' },
  { code: 'reports.view', name: 'View Reports', resource: 'reports', action: 'view' },
  // Property & Services
  { code: 'property.view', name: 'View Property', resource: 'property', action: 'view' },
  { code: 'property.manage', name: 'Manage Property', resource: 'property', action: 'manage' },
  { code: 'services.view', name: 'View Services', resource: 'services', action: 'view' },
  { code: 'services.manage', name: 'Manage Services', resource: 'services', action: 'manage' },
  { code: 'areas.view', name: 'View Areas', resource: 'areas', action: 'view' },
  { code: 'areas.create', name: 'Create Areas', resource: 'areas', action: 'create' },
  { code: 'areas.update', name: 'Update Areas', resource: 'areas', action: 'update' },
  { code: 'areas.deactivate', name: 'Deactivate Areas', resource: 'areas', action: 'deactivate' },
  { code: 'room_types.view', name: 'View Room Types', resource: 'room_types', action: 'view' },
  { code: 'room_types.create', name: 'Create Room Types', resource: 'room_types', action: 'create' },
  { code: 'room_types.update', name: 'Update Room Types', resource: 'room_types', action: 'update' },
  { code: 'rooms.view', name: 'View Rooms', resource: 'rooms', action: 'view' },
  { code: 'rooms.create', name: 'Create Rooms', resource: 'rooms', action: 'create' },
  { code: 'rooms.update', name: 'Update Rooms', resource: 'rooms', action: 'update' },
  { code: 'rooms.deactivate', name: 'Deactivate Rooms', resource: 'rooms', action: 'deactivate' },
  { code: 'tables.view', name: 'View Tables', resource: 'tables', action: 'view' },
  { code: 'tables.create', name: 'Create Tables', resource: 'tables', action: 'create' },
  { code: 'tables.update', name: 'Update Tables', resource: 'tables', action: 'update' },
  { code: 'tables.deactivate', name: 'Deactivate Tables', resource: 'tables', action: 'deactivate' },
  { code: 'service_points.view', name: 'View Service Points', resource: 'service_points', action: 'view' },
  { code: 'service_points.manage', name: 'Manage Service Points', resource: 'service_points', action: 'manage' },
  { code: 'beach_resources.view', name: 'View Beach Resources', resource: 'beach_resources', action: 'view' },
  { code: 'beach_resources.manage', name: 'Manage Beach Resources', resource: 'beach_resources', action: 'manage' },
  { code: 'pools.view', name: 'View Pools', resource: 'pools', action: 'view' },
  { code: 'pools.manage', name: 'Manage Pools', resource: 'pools', action: 'manage' },
  { code: 'event_spaces.view', name: 'View Event Spaces', resource: 'event_spaces', action: 'view' },
  { code: 'event_spaces.manage', name: 'Manage Event Spaces', resource: 'event_spaces', action: 'manage' },
  { code: 'operating_hours.view', name: 'View Operating Hours', resource: 'operating_hours', action: 'view' },
  { code: 'operating_hours.manage', name: 'Manage Operating Hours', resource: 'operating_hours', action: 'manage' },
  // Customers
  { code: 'customers.view', name: 'View Customers', resource: 'customers', action: 'view' },
  { code: 'customers.create', name: 'Create Customers', resource: 'customers', action: 'create' },
  { code: 'customers.update', name: 'Update Customers', resource: 'customers', action: 'update' },
  { code: 'customers.manage_vip', name: 'Manage VIP Status', resource: 'customers', action: 'manage_vip' },
  { code: 'customers.manage_blocks', name: 'Manage Customer Blocks', resource: 'customers', action: 'manage_blocks' },
  { code: 'customers.merge', name: 'Merge Customer Profiles', resource: 'customers', action: 'merge' },
  // Reservations
  { code: 'reservations.view', name: 'View Reservations', resource: 'reservations', action: 'view' },
  { code: 'reservations.create', name: 'Create Reservations', resource: 'reservations', action: 'create' },
  { code: 'reservations.update', name: 'Update Reservations', resource: 'reservations', action: 'update' },
  { code: 'reservations.confirm', name: 'Confirm Reservations', resource: 'reservations', action: 'confirm' },
  { code: 'reservations.cancel', name: 'Cancel Reservations', resource: 'reservations', action: 'cancel' },
  { code: 'reservations.mark_no_show', name: 'Mark No-Show', resource: 'reservations', action: 'mark_no_show' },
  { code: 'reservations.assign_room', name: 'Assign Room', resource: 'reservations', action: 'assign_room' },
  { code: 'reservations.apply_discount', name: 'Apply Discount', resource: 'reservations', action: 'apply_discount' },
  { code: 'reservations.override_price', name: 'Override Price', resource: 'reservations', action: 'override_price' },
  { code: 'reservations.record_deposit', name: 'Record Deposit', resource: 'reservations', action: 'record_deposit' },
  { code: 'reservations.view_financials', name: 'View Financials', resource: 'reservations', action: 'view_financials' },
  { code: 'availability.view', name: 'View Availability', resource: 'availability', action: 'view' },
  { code: 'room_blocks.view', name: 'View Room Blocks', resource: 'room_blocks', action: 'view' },
  { code: 'room_blocks.create', name: 'Create Room Blocks', resource: 'room_blocks', action: 'create' },
  { code: 'room_blocks.cancel', name: 'Cancel Room Blocks', resource: 'room_blocks', action: 'cancel' },
  { code: 'waitlist.view', name: 'View Waitlist', resource: 'waitlist', action: 'view' },
  { code: 'waitlist.create', name: 'Create Waitlist', resource: 'waitlist', action: 'create' },
  { code: 'waitlist.update', name: 'Update Waitlist', resource: 'waitlist', action: 'update' },
  { code: 'online_booking_requests.view', name: 'View Online Requests', resource: 'online_booking_requests', action: 'view' },
  { code: 'online_booking_requests.manage', name: 'Manage Online Requests', resource: 'online_booking_requests', action: 'manage' },
];

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
    await this.seedPermissions();
  }

  async seedPermissions() {
    for (const p of GLOBAL_PERMISSIONS) {
      await this.permission.upsert({
        where: { code: p.code },
        update: {},
        create: p,
      });
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
