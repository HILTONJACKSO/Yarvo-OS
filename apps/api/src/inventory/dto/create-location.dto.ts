export class CreateLocationDto {
  name: string;
  code: string;
  locationType: string;
  allowsReceiving?: boolean;
  allowsIssuing?: boolean;
  allowsSalesDeduction?: boolean;
  status?: string;
}
