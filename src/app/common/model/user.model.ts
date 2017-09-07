export class User {
  id: string;
  email: string;
  fullName: string;
  userType: string;
  roles: any;
  password: string;
  company: any;
  location: any;

  constructor(id: string = '', email: string = '', fullName: string = ''
    , roles: any = '', password: string = '', userType: string = ''
    , company: any = '', location: any = '') {
    this.id = id;
    this.email = email;
    this.fullName = fullName;
    this.roles = roles;
    this.password = password;
    this.userType = userType;
    this.company = company;
    this.location = location;
  }
}
