export class User {
  id: string;
  email: string;
  fullName: string;
  roles: any[];

  constructor(id: string = '', email: string = '', fullName: string = '', roles: any[] = []) {
    this.id = id;
    this.email = email;
    this.fullName = fullName;
    this.roles = roles;
  }
}
