import { Vector3 } from "babylonjs";
import { PathItem } from "../../../model/item/PathItem";

export class PathBuilder {

    startPath(pos: Vector3): PathItem {
        return new PathItem([new Vector3(pos.x, 0.5, pos.z)]);
    }

    updatePath(path: PathItem, pos: Vector3): PathItem {
        path.setPoint(1, new Vector3(pos.x, 0.5, pos.z));
        return path;
    }

    closePath(path: PathItem, pos: Vector3): PathItem {
        path.addPoint(new Vector3(pos.x, 0.5, pos.z));
        return path;
    }    
}