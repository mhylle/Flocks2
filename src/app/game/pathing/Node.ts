export class Node {
  x: number;
  y: number;
  cost: number;
  parent: Node;
  depth: number;

  compareTo(other: Node) : number {
    return other.cost - this.cost;
  }

  setParent(parent: Node) : number {
    this.depth = parent.depth +1;
    this.parent = parent;
    return this.depth;

  }
}
