import { NodeMaterial, SpotLight, Tools, Vector3 } from "babylonjs";
import { AddonName } from "../model/addons/AbstractAddon";
import { GameObj, GameObjTag } from "../model/objs/GameObj";
import { BikeMovingState } from "../model/states/BikeMovingState";
import { World } from "../services/World";
import { AbstractController } from "./IController";

export class PlayerController extends AbstractController {
    private world: World;
    private selectionLight: SpotLight;

    constructor(world: World) {
        super();
        this.world = world;

        this.world.onReady(() => this.createSelectionLight())
    }

    private createSelectionLight() {
        const scene = this.world.scene;
        
        // const targetObj = this.world.store.getGameObjsByTag(GameObjTag.Player)[0];
        // this.selectionLight = new SpotLight("selection-light", new Vector3(0, 6, 0), new Vector3(0, -1, 0), Tools.ToRadians(45), 1, scene);
    }

    setPlayer(obj: GameObj) {
        const scene = this.world.scene;

        const targetObj = this.world.districtStore.getGameObjsByTag(GameObjTag.Player)[0];

        // this.selectionLight.parent = obj.getMesh();

        // NodeMaterial.ParseFromSnippetAsync("RXBW6F", scene).then((nodeMaterial) => {
        //     var proceduralTexture = nodeMaterial.createProceduralTexture(256, scene);
        //     this.selectionLight.position.x = 0;
        //     this.selectionLight.position.z = 0;
        //     this.selectionLight.position.y = 3;
        //     this.selectionLight.setDirectionToTarget(new Vector3(0, 0, 0));
        //     this.selectionLight.intensity = 2;
        //     this.selectionLight.projectionTexture = proceduralTexture;
        //     // this.selectionLight.setEnabled(false);
        // });
        // this.selectionLight.position.x = obj.getPosition2D().x;
        // this.selectionLight.position.y = obj.getPosition2D().y;
        // this.selectionLight.position.z = 3;
        // this.selectionLight.direction = new Vector3(0, -1, 0);
        // this.selectionLight.position = new Vector3(0, 4, 0)
        // this.selectionLight.setDirectionToTarget(obj.getPosition());
        // this.selectionLight.setEnabled(true);
        // const targetObj = this.world.store.getGameObjsByTag(GameObjTag.Player)[0];

    }
    
    keyboard(e: KeyboardEvent) {
        switch(e.key) {
            case 'b':
                const bicycles = this.world.districtStore.getGameObjsByTag(GameObjTag.Bicycle);
                const player = this.world.districtStore.getGameObjsByTag(GameObjTag.Player)[0];

                const bikeAndDist = bicycles.map(bicycle => {
                    return {
                        bike: bicycle,
                        dist: bicycle.mesh.distance(player)
                    }
                });
                bikeAndDist.sort((d1, d2) => d1.dist - d2.dist);

                if (bikeAndDist[0].dist < 1.5) {
                    const bike = bikeAndDist[0].bike;
                    player.tag.removePlayer();
                    const highlightAddon = player.addon.getByName(AddonName.Highlight);
                    player.addon.remove(highlightAddon);
                    player.state.setDefaultState();
                    bike.tag.addPlayer();
                    bike.addon.add(highlightAddon);
                    bike.state.currState = new BikeMovingState(bike, this.world);
                }
            break;
        }
    }
}