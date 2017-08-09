export class Role {
  id: string;
  roleName: string;
  description: string;
  scopes: any;
  createdAt: any;


  constructor(roleName: string, description: string, createdAt: any, id: string,scopes: any) {
    this.roleName = roleName || '';
    this.description = description || '';
    this.createdAt = createdAt || '';
    this.id = id  || '';
    this.scopes = scopes  || [];
  }
}
