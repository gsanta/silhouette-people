
/**
 * link: https://math.stackexchange.com/questions/274712/calculate-on-which-side-of-a-straight-line-is-a-given-point-located
 * 
 * AB line direction: <x2,y2>−<x1,y1>=<x2−x1,y2−y1>
 * Orthogonal (perpendicular) direction Vnormal = <y2−y1,−(x2−x1)> (flip the x's and the y's and negate one component i.e (y's, -x's))
 * One possible vector going from the line to the Point P is D = P − A = <x−x1,y−y1>
 * 
 * This vector D is made of 2 components, a component Dparallel that is parallel to the line AB and a component Dperp that is
 * perpendicular to the line AB. By definition `Dparallel ⋅ Vnormal = 0`. Since a direction parallel to the line will be perpendicular to 
 * the normal of that line.
 * 
 * We are interested in knowing whether the point is on the side the normal points to, 
 * or the side the normal points opposite to. In other words, we want to know if Dperp is in the same direction as Vnormal or not.
 * This is essentially the sign of the dot product of D and Vnormal since D ⋅ Vnormal = (Dperp + Dparallel) ⋅ Vnormal = Dperp ⋅ Vnormal
 * 
 * Arithmetically: <x−x1,y−y1> ⋅ <y2−y1,−(x2−x1)> = (x−x1)(y2−y1) − (y−y1)(x2−x1)
 */

import { Vector2 } from "babylonjs";
import { LineEquation } from "./LineEquation";

export class LineSideCalc {
    private readonly line: LineEquation;
    
    constructor(line: LineEquation) {
        this.line = line;
    }

    getSide(P: Vector2): number {
        const [A, B] = this.getPointsOnLine(P);
        const side = (P.x - A.x) * (B.y - A.y) - (P.y - A.y) * (B.x - A.x);
        return Math.sign(side);
    }

    private getPointsOnLine(point: Vector2): [Vector2, Vector2] {
        if (this.line.isVertical()) {
            const x = this.line.getX(0);
            return [ new Vector2(x, point.y - 5), new Vector2(x, point.y + 5) ];
        } else if (this.line.isHorizontal()) {
            const y = this.line.getY(0);
            return [ new Vector2(point.x - 5, y), new Vector2(point.x + 5, y) ];
        } else if (Math.abs(this.line.angle) < Math.PI / 4) {
            const x = point.x;
            return [ new Vector2(x - 5, this.line.getY(x - 5)), new Vector2(x + 5, this.line.getY(x + 5)) ];
        } else {
            const y = point.y;
            return [ new Vector2(this.line.getX(y - 5), y - 5), new Vector2(this.line.getX(y + 5), y + 5) ];
        }
    }
}
