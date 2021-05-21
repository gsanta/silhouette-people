

export class Direction {
    static isBetweenAngles(angle1: number, angle2: number, testedAngle: number) {
        if (angle2 >= angle1) {
            return testedAngle >= angle1 && testedAngle <=angle2;
        } else {
            return (
                testedAngle >= angle1 && testedAngle <= 2 * Math.PI ||
                testedAngle <= angle2 && testedAngle >= 0
            );
        }
    }

    static angleBetween(angle1: number, angle2: number): number {
        if (angle2 >= angle1) {
            return angle2 - angle1;
        } else {
            return 2 * Math.PI - angle1 + angle2;
        }
    }

    static normalizeAngle(angle: number) {
        angle = angle % 360;

        if (angle < 0) {
            angle += 360;
        }
    }
}