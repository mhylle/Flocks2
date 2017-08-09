export class Node {
  x: number;
  y: number;
  cost: number;
  parent: Node;

  compareTo(other: Node) : number {
    return other.cost - this.cost;
  }
}
