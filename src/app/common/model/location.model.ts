export class Location {
  id: string;
  countryName: string;
  stateName: string;
  cityName: string;
  address: any;
  postCode: string;

  constructor(id: string = '', countryName: string = '', stateName: string = '',
              cityName: string = '', address: any = '', postCode: string = '') {
    this.id = id;
    this.countryName = countryName;
    this.stateName = stateName;
    this.cityName = cityName;
    this.address = address;
    this.postCode = postCode;
  }
}
