import {Injectable} from '@angular/core';
import {Path} from "./Path";
import {Tile} from "../level/model/level/Tile";
import {LevelService} from "../level/level.service";
import {Node} from "./Node";
import {Unit} from "../level/model/units/Unit";


@Injectable()
export class PathfinderService {

  private open: Node[] = [];
  private closed: Node[] = [];
  maxSearchDistance: number = 1;
  nodes: Node[][];

  constructor(private levelService: LevelService) {
  }

  findPath(unit: Unit, source: Tile, target: Tile): Path {
    let level = this.levelService.getLevel();
    if (level[target.x][target.y].isBlocked()) {
      return null;
    }
    this.nodes[source.x][source.y].cost = 0;
    this.open = [];
    this.closed = [];
    this.nodes[source.x][source.y].parent = null;

    let maxDepth: number = 0;

    while ((maxDepth < this.maxSearchDistance) && this.open.length != 0) {
      let currentNode = this.open[0];
      if (currentNode == this.nodes[target.x][target.y]) {
        break;
      }

      let index = this.open.indexOf(currentNode, 0);
      if (index > -1) {
        this.open.splice(index, 1);
      }
      this.closed.push(currentNode);

      for (let x = -1; x < 2; x++) {
        for (let y = -1; y < 2; y++) {
          if (((x == 0) && y == 0)) {
            // ourself
            continue;
          }

          let xp = x + currentNode.x;
          let yp = y + currentNode.y;

          if (this.isValidLocation(source, xp,yp)) {
            let nextStepCost = currentNode.cost + this.getMovementCost(unit, xp,yp);
            let neighbour = this.nodes[xp][yp];
            this.levelService.pathFinderVisited(xp,yp);
            if (nextStepCost < neighbour.cost) {
              let openIndex = this.open.indexOf(neighbour, 0);
              if (openIndex> -1){
                this.open.splice(openIndex, 1);
              }
              let closedIndex = this.closed.indexOf(neighbour, 0);
              if (closedIndex> -1){
                this.closed.splice(closedIndex, 1);
              }
            }

            if (this.open.indexOf(neighbour, 0) == -1 && this.closed.indexOf(neighbour, 0)) {
              neighbour.cost = nextStepCost;
              maxDepth = Math.max(maxDepth, neighbour.setParent(currentNode));
              this.open.push(neighbour);
            }
          }
        }
      }
    }
    if (this.nodes[target.x][target.y] == null) {
      return null;
    }

    let path = new Path();
    let theTarget = this.nodes[target.x][target.y];
    while (theTarget != this.nodes[source.x][source.y]) {
      path.prependStep(theTarget.x, theTarget.y);
      theTarget = theTarget.parent;
    }
    path.prependStep(source.x, source.y);
    return path;
  }

  private getMovementCost(unit: Unit, xp: number, yp: number): number {
    return this.levelService.cost(unit, xp,yp);
  }

  isValidLocation(node: Tile, x: number, y: number) : boolean {
    let level = this.levelService.getLevel();
    let invalid = (x<0) ||(y<0)|| (x>this.levelService.getWidthInTiles()) ||(y > this.levelService.getHeightInTiles());
    if ((!invalid) && ((node.x != x) ||(node.y != y))) {
      invalid = level[x][y].isBlocked();
    }
    return !invalid;
  }
}
