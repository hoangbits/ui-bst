export class Scope {
  id: string;
  scopeName: string;

  constructor(scopeName: string, id: string) {
    this.scopeName = scopeName;
    this.id = id;
  }
}
