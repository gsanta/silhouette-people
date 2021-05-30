import { Mesh, NullEngine, Scene, Vector3 } from "babylonjs";
import { CharacterItem } from "../src/model/item/character/CharacterItem";
import { MeshItem } from "../src/model/item/mesh/MeshItem";
import { CollisionSensor } from "../src/model/item/route/adapters/collision/CollisionSensor";

describe("CollisionSensor", () => {
    it ('works with null engine', () => {
        var engine = new NullEngine();
        var scene = new Scene(engine);

        
        const obstacle1 = new MeshItem('mesh-1')

        const mesh = new Mesh('test-mesh', scene);

        obstacle1.meshes = [mesh];
        obstacle1.position = new Vector3(5, 0, 5);

        const character = new CharacterItem('character-1');
        const mesh2 = new Mesh('character-mesh', scene);
        character.meshes = [mesh2];
        character.velocity = new Vector3(1, 0, 0);
        character.position = new Vector3(3.5, 0, 5);


        const collisionSensor = new CollisionSensor(character);
        console.log(collisionSensor.steer([obstacle1]))
    });
});