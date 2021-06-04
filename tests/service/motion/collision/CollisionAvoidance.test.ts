import { Mesh, NullEngine, Scene, Vector3 } from "babylonjs";
import { CharacterItem } from "../../../../src/model/item/character/CharacterItem";
import { RouteItem } from "../../../../src/model/item/route/RouteItem";
import { RouteWalkerImpl } from "../../../../src/model/item/route/RouteWalkerImpl";
import { GraphEdge, GraphVertex } from "../../../../src/service/graph/GraphImpl";
import { CollisionAvoidance } from "../../../../src/service/motion/collision/CollisionAvoidance";
import { CollisionSensor } from "../../../../src/service/motion/collision/CollisionSensor";
import { checkVector3Equal, checkVertexEqual } from "../../../test_utils/routeUtils";

describe('avoid', () => {

    it ('no avoidance needed', () => {
        var engine = new NullEngine();
        var scene = new Scene(engine);
        
        const character = createCharacter(new Vector3(1, 0, 1), new Vector3(1, 0, 0), scene);
        const obstacle = createObstacle('obstacle-1', new Vector3(5, 0, 1), 1, scene);
        const collisionSensor = new CollisionSensor(character, 1);
        const route = new RouteItem(createRoute());
        const routeWalker = new RouteWalkerImpl(route, character);
        const collisionAvoidance = new CollisionAvoidance(routeWalker, collisionSensor);
        
        collisionAvoidance.avoid([obstacle]);

        expect(routeWalker.getRoute()).toBe(route);
    });

    it ('avoidance is needed', () => {
        var engine = new NullEngine();
        var scene = new Scene(engine);
        
        const character = createCharacter(new Vector3(1, 0, 3), new Vector3(0, 0, 1), scene);
        const obstacle = createObstacle('obstacle-1', new Vector3(1, 0, 5), 1, scene);
        const collisionSensor = new CollisionSensor(character, 2);
        const route = new RouteItem(createRoute());
        const routeWalker = new RouteWalkerImpl(route, character);
        const collisionAvoidance = new CollisionAvoidance(routeWalker, collisionSensor);
        
        collisionAvoidance.avoid([obstacle]);
        const newRoute = routeWalker.getRoute();

        expect(newRoute.getEdges().length).toBe(4);
        checkVertexEqual(newRoute.firstEdge.v2, new GraphVertex(undefined, new Vector3(1, 0, 3)));
        checkVertexEqual(newRoute.getEdge(1).v1, new GraphVertex(undefined, new Vector3(1, 0, 3)));
        checkVertexEqual(newRoute.getEdge(1).v2, new GraphVertex(undefined, new Vector3(2.866, 0, 4.866)));
        checkVertexEqual(newRoute.getEdge(2).v1, new GraphVertex(undefined, new Vector3(2.866, 0, 4.866)));
        checkVertexEqual(newRoute.getEdge(2).v2, new GraphVertex(undefined, new Vector3(1, 0, 10)));
        expect(newRoute.lastEdge).toBe(route.lastEdge);
    });
});

function createObstacle(id: string, position: Vector3, radius: number, scene: Scene): CharacterItem {
    const obstacle = new CharacterItem(id);

    const mesh = new Mesh(`${id}-mesh`, scene);

    obstacle.meshes = [mesh];
    obstacle.position = position;
    obstacle.radius = radius;
    return obstacle;
}

function createCharacter(position: Vector3, velocity: Vector3, scene: Scene): CharacterItem {
    const character = new CharacterItem('character-1');
    const mesh = new Mesh('character-mesh', scene);
    character.meshes = [mesh];
    character.velocity = velocity;
    character.position = position;
    return character;
}

function createRoute(): GraphEdge[] {
    const vertices: GraphVertex[] = [
        new GraphVertex('1', new Vector3(1, 0, 1)),
        new GraphVertex('2', new Vector3(1, 0, 10)),
        new GraphVertex('3', new Vector3(10, 0, 10)),
    ];

    return [
        new GraphEdge(vertices[0], vertices[1]),
        new GraphEdge(vertices[1], vertices[2]),
    ]
}