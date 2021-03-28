import { NodeMaterial, SpotLight, Tools, Vector3 } from "babylonjs";
import { GameObj, GameObjectType } from "../../model/objs/GameObj";
import { World } from "../../services/World";
import { AbstractAddon, AddonName } from "./AbstractAddon";

export class HighlightAddon extends AbstractAddon {
    name: AddonName = AddonName.PlayerHighlight;
    private world: World;

    private selectionLight: SpotLight;

    constructor(world: World) {
        super();
        this.world = world;
    }

    update(gameObj: GameObj) {
        this.lazyInitIfNeeded(gameObj);
        this.updatePosition(gameObj);
    }

    private lazyInitIfNeeded(gameObj: GameObj) {
        const { scene, store } = this.world;

        const lightReceivers = store.getGameObjsByType(GameObjectType.Road1, GameObjectType.House1, GameObjectType.House2, GameObjectType.House3);
        // const roads = store.getAllGameObjects().filter(obj => obj.type === GameObjectType.Road1).map(r => r.allMeshes[0]);
        
        if (!this.selectionLight) {
            this.selectionLight = new SpotLight("selection-light", new Vector3(0, 6, 0), new Vector3(0, -1, 0), Tools.ToRadians(45), 1, scene);
        
            // lightReceivers.forEach(receiver => this.selectionLight.includedOnlyMeshes.push(...receiver.allMeshes));

            NodeMaterial.ParseFromSnippetAsync("RXBW6F", scene).then((nodeMaterial) => {
                var proceduralTexture = nodeMaterial.createProceduralTexture(256, scene);
                this.selectionLight.intensity = 2;

                this.updatePosition(gameObj)

                this.selectionLight.projectionTexture = proceduralTexture;
            });        
        }
    }

    private updatePosition(gameObj: GameObj) {
        const pos = gameObj.getPosition2D();

        this.selectionLight.position.x = pos.x;
        this.selectionLight.position.z = pos.y;
        this.selectionLight.position.y = 3;
        this.selectionLight.setDirectionToTarget(new Vector3(pos.x, 0, pos.y));
    }
}