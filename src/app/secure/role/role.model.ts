export class Role {
  id: string;
  roleName: string;
  description: string;
  scopes: any;
  createdAt: Date;

  constructor(roleName: string = '', description: string = '', id: string = '', scopes: any = '') {
    this.roleName = roleName;
    this.description = description;
    this.id = id;
    this.scopes = scopes;
  }
}
