export class Scope {
    id: string;
    scopeName: string;
    description: string;
    activities: any;

    constructor(scopeName: string, activities: any, description?: string) {
        this.scopeName = scopeName || '';
        this.activities = activities || [];
        this.description = description || '';
    }
}
