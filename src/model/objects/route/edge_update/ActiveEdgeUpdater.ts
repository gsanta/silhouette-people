import { Vector3 } from "babylonjs";
import { GraphEdge } from "../../../../service/graph/GraphEdge";
import { LineEquationSideCalc } from "../../../math/LineEquationSideCalc";
import { RouteController } from "../../game_object/controller_route/RouteController";

export class ActiveEdgeUpdater {
    private readonly routeWalker: RouteController;
    private currentSide: number = undefined;
    private lineSideCalc: LineEquationSideCalc;
    
    constructor(routeWalker: RouteController) {
        this.routeWalker = routeWalker;
    }

    initActiveEdge() {
        const character = this.routeWalker.getCharacter();
        const route = this.routeWalker.getRoute();
        const edge = route.getEdges()[0];
        this.routeWalker.setEdge(edge);
        const source = this.routeWalker.getSource().p;
        character.position = new Vector3(source.x, 0, source.z);

        this.updateSide();
    }
    
    updateActiveEdge() {
        if (this.isEdgeFinished()) {
            this.setNextCheckPoint();
            return true;
        }
    }

    private setNextCheckPoint() {
        const nextEdge = this.getNextEdge();
        this.routeWalker.setEdge(nextEdge);
        this.updateSide();
    }

    private getNextEdge(): GraphEdge {
        const edge = this.routeWalker.getEdge();
        const edges = this.routeWalker.getRoute().getEdges();
        let nextEdge: GraphEdge;

        if (edge === edges[edges.length - 1]) {
            nextEdge = undefined;
        } else {
            nextEdge = edges[edges.indexOf(edge) + 1];
        }

        return nextEdge;
    }

    updateSide() {
        const edge = this.routeWalker.getEdge();
        if (edge) {
            const character = this.routeWalker.getCharacter();
            this.lineSideCalc = new LineEquationSideCalc(this.routeWalker.getRoute().getBorderLine(edge));
            this.currentSide = this.lineSideCalc.determineSide(character.position2D);
        }
    }

    private isEdgeFinished() {
        const character = this.routeWalker.getCharacter();

        const side = this.lineSideCalc.determineSide(character.position2D);
        return side !== this.currentSide;
    }
}