export class MapNode {
  x: number;
  y: number;
  cost: number;
  parent: MapNode;
  depth: number;
  heuristic: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.depth = 0;
    this.cost = 0;
  }

  compareTo(other: MapNode): number {
    let f = this.heuristic + this.cost;
    let of = other.cost - this.cost;
    if (f < of ) {
      return 1;
    }
    if (f > of) {
      return -1;
    }

    if (f == of) {
      return 0;
    }
  }

  setParent(parent: MapNode): number {
    this.depth = parent.depth + 1;
    console.log("Node (" + this.x + ", " + this.y + ") now has parent (" + parent.x + ", " + parent.y);
    this.parent = parent;
    return this.depth;

  }
}
