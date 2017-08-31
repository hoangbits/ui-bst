export class Companies {
  companyId: string;
  companyName: string;

  constructor(companyName: string, companyId: string) {
    this.companyName = companyName;
    this.companyId = companyId;
  }
}
