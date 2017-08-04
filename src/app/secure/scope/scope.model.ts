export class Scope {
    id: string;
    scopeName: string;
    activities: any;

    constructor(scopeName: string, activities: any) {
        this.scopeName = scopeName;
        this.activities = activities;
    }
}
