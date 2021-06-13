import { GraphEdge } from "../../../service/graph/GraphEdge";
import { GraphVertex } from "../../../service/graph/GraphImpl";
import { RouteItem } from "../../objects/route/RouteItem";


export class VertexInjector {

    inject(route: RouteItem, currEdge: GraphEdge, newVertices: GraphVertex[]) {
        const v1 = route.isReversed(currEdge) ? currEdge.v2 : currEdge.v1;
        const v2 = currEdge.getOtherVertex(v1);

        newVertices = [v1, ...newVertices, v2];

        const newEdges: GraphEdge[] = [];

        for (let i = 0; i < newVertices.length - 1; i++) {
            const edge = new GraphEdge(newVertices[i], newVertices[i + 1]);
            newEdges.push(edge);
        }

        route = route.replaceEdge(currEdge, ...newEdges);

        return route;

        // const targetPos = character.position.add(toVector3(point.multiply(new Vector2(3, 3))));

        // const vertex1 = new GraphVertex(null, character.position)
        // const vertex2 = new GraphVertex(null, targetPos);
        // const vertex3 = this.walker.getTarget();
        // const newEdge1 = new GraphEdge(vertex1, vertex2);
        // const newEdge2 = new GraphEdge(vertex2, vertex3);
        // const index = this.walker.getRoute().getIndex(currEdge);
        // const newRoute = this.walker.getRoute().insert(index, newEdge2).insert(index, newEdge1);
        // this.walker.setRoute(newRoute);
        // this.walker.setEdge(newEdge1);
    }
}