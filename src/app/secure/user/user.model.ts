export class User {
    id: string;
    email: string;
    fullName: string;
    roles: string;
    constructor(id: string='', email: string='', fullName: string='', roles: string=''){
            this.id = id;
            this.email = email;
            this.fullName = fullName;
            this.roles = roles;
    }
}
