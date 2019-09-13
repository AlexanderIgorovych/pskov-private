export class PartnerClass {
  constructor(
    public id: number,
    public type: number,
    public name: string,
    public passport: string,
    public inn: string,
    public blocked: boolean
  ) {}
}

export interface Partner {
  id: number;
  type: number;
  name: string;
  passport: string;
  international_passport? : string;
  inn: string;
  blocked: boolean;
  cards?: PartnerCard[];
}

export interface PartnerCard {
  id: number;
  type: 0 | 1;
  number: string;
  phone_number: string;
}
