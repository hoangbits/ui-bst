export class Role {
  id: string;
  roleName: string;


  constructor(roleName: string,  id: string) {
    this.roleName = roleName || '';
    this.id = id  || '';
  }
}