export class Role {
  id: string;
  roleName: string;
  description: string;
  scopes: any;
  createdAt: Date;
  roleType: string;

  constructor(roleName: string = '', description: string = '', id: string = '', scopes: any = '', roleType: string = '') {
    this.roleName = roleName;
    this.description = description;
    this.id = id;
    this.scopes = scopes;
    this.roleType = roleType;
  }
}
