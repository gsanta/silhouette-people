import { Vector2, Vector3 } from "babylonjs";
import { PathObj } from "../../../model/object/PathObj";

export class PathBuilder {

    startPath(pos: Vector2): PathObj {
        return new PathObj([new Vector3(pos.x, 0.5, pos.y)]);
    }

    updatePath(path: PathObj, pos: Vector2): PathObj {
        path.setPoint(1, new Vector3(pos.x, 0.5, pos.y));
        return path;
    }

    closePath(path: PathObj, pos: Vector2): PathObj {
        path.addPoint(new Vector3(pos.x, 0.5, pos.y))
        return path;
    }    
}