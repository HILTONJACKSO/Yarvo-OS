export class CreateReservationDto {
  guest: {
    firstName: string;
    lastName: string;
    phone?: string;
    email?: string;
  };
  stay: {
    arrivalDate: string;
    departureDate: string;
    numberOfRooms: number;
    adults: number;
    children: number;
    infants: number;
  };
  pricing: {
    basePrice: number;
    discountType: string;
    discountValue: number;
    taxAmount: number;
    depositRequiredPercent: number;
  };
  guarantee: {
    type: string;
    depositMethod: string;
    depositAmount: number;
    referenceNumber?: string;
  };
  status: string;
}
