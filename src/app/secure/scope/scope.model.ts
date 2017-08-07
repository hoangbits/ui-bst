export class Scope {
  id: string;
  scopeName: string;
  description: string;
  activities: any;
  createdBy: string;
  createdAt: Date;

  constructor(scopeName: string, activities: any, createdBy: string, description?: string) {
    this.scopeName = scopeName;
    this.activities = activities || [];
    this.createdBy = createdBy;
    this.description = description;
  }
}
