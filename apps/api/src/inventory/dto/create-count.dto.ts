export class CreateCountDto {
  name: string;
  countType: string;
  locationIds: string[];
  blindCount?: boolean;
  freezeMovements?: boolean;
  notes?: string;
}
