import { Vector2, Vector3 } from "babylonjs";
import { Path } from "../../../model/general/objs/Path";

export class PathBuilder {

    startPath(pos: Vector2): Path {
        return new Path([new Vector3(pos.x, 0.5, pos.y)]);
    }

    updatePath(path: Path, pos: Vector2): Path {
        path.setPoint(1, new Vector3(pos.x, 0.5, pos.y));
        return path;
    }

    closePath(path: Path, pos: Vector2): Path {
        path.addPoint(new Vector3(pos.x, 0.5, pos.y))
        return path;
    }    
}