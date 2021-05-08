import { Vector2, Vector3 } from "babylonjs";
import { PathItem } from "../../../model/item/PathItem";

export class PathBuilder {

    startPath(pos: Vector2): PathItem {
        return new PathItem([new Vector3(pos.x, 0.5, pos.y)]);
    }

    updatePath(path: PathItem, pos: Vector2): PathItem {
        path.setPoint(1, new Vector3(pos.x, 0.5, pos.y));
        return path;
    }

    closePath(path: PathItem, pos: Vector2): PathItem {
        path.addPoint(new Vector3(pos.x, 0.5, pos.y))
        return path;
    }    
}