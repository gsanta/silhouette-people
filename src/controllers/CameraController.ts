import { Vector3 } from "babylonjs";
import { DistrictObj } from "../model/objs/DistrictObj";
import { World } from "../services/World";
import { AbstractController } from "./IController";

export class CameraController extends AbstractController {
    private world: World;

    constructor(world: World) {
        super();
        this.world = world;
    }

    setCameraLocation(district: DistrictObj, corner: number) {
        const center = district.basicComp.platform.getAbsolutePosition();
        const size = district.size;
        let pos: Vector3;
        const height = 25;
        const halfX = size.x / 2;
        const halfY = size.y / 2;
        const offset = 15;

        switch(corner) {
            case 1:
                pos = center.add(new Vector3(halfX + offset, height, halfY + offset));
            break;
            case 2:
                pos = center.add(new Vector3(halfX + offset, height, -halfY - offset));
            break;
            case 3:
                pos = center.add(new Vector3(-halfX - offset, height, -halfY - offset));
            break;
            case 4:
                pos = center.add(new Vector3(-halfX - offset, height, halfY + offset));
            break;
        }

        this.world.camera.setPosition(pos);
        this.world.camera.setTarget(center);
    }
}