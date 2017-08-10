import {Step} from "./Step";

export class Path {
  steps: Step[];


  getX(index: number) : number {
    return this.steps[index].x;
  }

  getY(index: number) : number {
    return this.steps[index].y;
  }
  getLength(): number {
    return this.steps.length;
  }

  appendStep(x: number, y: number) {
    this.steps.push(new Step(x, y))
  }

  prependStep(x: number, y: number) {
    this.steps.unshift(new Step(x, y));
  }

  contains(x: number, y: number): boolean {
    for (let i = 0; i < this.steps.length; i++) {
      let step = this.steps[i];
      if (step.x == x && step.y == y) {
        return true;
      }
    }
    return false;
  }


}
