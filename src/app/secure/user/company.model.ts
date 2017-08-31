export class Company {
  id: string;
  companyName: string;

  constructor(companyName: string = '',  id: string = '') {
    this.companyName = companyName ;
    this.id = id ;
  }
}
