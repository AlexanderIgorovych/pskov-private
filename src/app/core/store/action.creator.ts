export class ActionCreator {
  constructor(type: string) {
    this.type = type;
  }
  type: string;
  createAction() {
    return JSON.parse(JSON.stringify(this));
  }
}
