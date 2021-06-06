import { Vector2 } from "babylonjs";
import { rotateVec, toVector2, toVector3, vector2ToRotation } from "../../helpers";
import { MeshItem } from "../item/mesh/MeshItem";


export class Rotation {

    readonly vector: Vector2;

    constructor(vector: Vector2) {
        this.vector = vector;
    }

    get rotationRad() {
        return vector2ToRotation(this.vector);
    }

    addRotation(rad: number) {
        const vec = rotateVec(toVector3(this.vector), -rad);
        return new Rotation(new Vector2(vec.x, vec.z));
    }

    diffRad(vec: Vector2): number {
        const thisRotation = this.rotationRad;
        const vecRotation = vector2ToRotation(vec);

        if (vecRotation > thisRotation) {
            const diff = vecRotation - thisRotation;
            if (diff < Math.PI) {
                return diff;
            } else {
                return -(2 * Math.PI - diff);
            }
        } else {
            const diff = thisRotation - vecRotation;
            if (diff < Math.PI) {
                return -diff;
            } else {
                return 2 * Math.PI - diff;
            }
        }
    }
}