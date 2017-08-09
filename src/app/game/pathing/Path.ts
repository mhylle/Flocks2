export class Path {
  steps: any[];

  prependStep(x: number, y: number) {
    this.steps.unshift(new Step());
  }


}
