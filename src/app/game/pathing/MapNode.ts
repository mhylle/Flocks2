export class MapNode {
  x: number;
  y: number;
  cost: number;
  parent: MapNode;
  depth: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.depth = 0;
    this.cost = 0;
  }

  compareTo(other: MapNode): number {
    return other.cost - this.cost;
  }

  setParent(parent: MapNode): number {
    this.depth = parent.depth + 1;
    console.log("Node (" + this.x + ", " + this.y + ") now has parent (" + parent.x + ", " + parent.y);
    this.parent = parent;
    return this.depth;

  }
}
