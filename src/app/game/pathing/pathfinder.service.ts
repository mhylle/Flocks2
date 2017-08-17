import {Injectable} from '@angular/core';
import {Path} from "./Path";
import {Tile} from "../level/model/level/Tile";
import {LevelService} from "../level/level.service";
import {MapNode} from "./MapNode";
import {Unit} from "../level/model/units/Unit";
import {HeuristicService} from "./heuristic.service";

@Injectable()
export class PathfinderService {

  private open: MapNode[] = [];
  private closed: MapNode[] = [];
  maxSearchDistance: number = 500;
  nodes: MapNode[][];

  constructor(private levelService: LevelService, private heuristicService: HeuristicService) {
  }

  getNodes(): MapNode[][] {
    return this.nodes;
  }

  findPath(unit: Unit, target: Tile): Path {
    let level = this.levelService.getLevel();
    this.nodes = [];
    for (let i = 0; i < this.levelService.getWidthInTiles(); i++) {
      this.nodes[i] = [];
      for (let j = 0; j < this.levelService.getHeightInTiles(); j++) {
        this.nodes[i][j] = new MapNode(i, j);
      }
    }
    let tile = level[target.x][target.y];
    if (tile.isBlocked()) {
      return null;
    }
    this.nodes[unit.x][unit.y].cost = 0;
    this.open = [];
    this.closed = [];
    this.nodes[unit.x][unit.y].parent = null;

    let maxDepth: number = 0;
    this.open.push(this.nodes[unit.x][unit.y]);
    while ((maxDepth < this.maxSearchDistance) && this.open.length != 0) {
      let currentNode = this.open[0];
      if (currentNode == this.nodes[target.x][target.y]) {
        console.log("found target");
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

          if (this.isValidLocation(unit, xp, yp, target.x, target.y)) {
            let nextStepCost = currentNode.cost + this.getMovementCost(unit, currentNode.x, currentNode.y, xp, yp);
            let neighbour = this.nodes[xp][yp];
            this.levelService.pathFinderVisited(xp, yp);
            if (nextStepCost < neighbour.cost) {
              let openIndex = this.open.indexOf(neighbour, 0);
              if (openIndex > -1) {
                this.open.splice(openIndex, 1);
              }
              let closedIndex = this.closed.indexOf(neighbour, 0);
              if (closedIndex > -1) {
                this.closed.splice(closedIndex, 1);
              }
            }

            if ((this.open.indexOf(neighbour, 0) == -1) && (this.closed.indexOf(neighbour, 0) == -1)) {
              neighbour.cost = nextStepCost;
              neighbour.heuristic = this.heuristicService.getCost(currentNode.x, currentNode.y, xp, yp);
              let parentDepth = neighbour.setParent(currentNode);
              maxDepth = Math.max(maxDepth, parentDepth);
              this.open.push(neighbour);
              this.open = this.open.sort((o1, o2) => {
                return o1.compareTo(o2);
              });
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
    console.log("Initial target: " + theTarget.x + ", " + theTarget.y);
    let mapNode = this.nodes[unit.x][unit.y];
    console.log("MapNode: " + mapNode.x + ", " + mapNode.y);
    while (theTarget != null && theTarget != mapNode) {
      console.log("Prepending: " + theTarget.x + ", " + theTarget.y)
      path.prependStep(theTarget.x, theTarget.y);
      console.log("Targets Parent: " + theTarget.parent);
      theTarget = theTarget.parent;
    }
    path.prependStep(unit.x, unit.y);
    console.log("Path has: " + path.steps.length + " steps");
    return path;
  }

  private getMovementCost(unit: Unit, cx: number, cy: number, xp: number, yp: number): number {
    return this.levelService.cost(unit, cx, cy, xp, yp);
  }

  isValidLocation(unit: Unit, x: number, y: number, tx: number, ty: number): boolean {
    let level = this.levelService.getLevel();
    if (x == tx && y == ty) {
      return true;
    }
    let invalid = (x < 0) || (y < 0) || (x > (this.levelService.getWidthInTiles() - 1)) || (y > (this.levelService.getHeightInTiles() - 1));
    if ((!invalid) && ((unit.x != x) || (unit.y != y))) {
      invalid = level[y][x].isBlocked();
    }
    return !invalid;
  }
}
