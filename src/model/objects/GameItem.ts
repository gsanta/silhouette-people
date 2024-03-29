import { Vector2, Vector3 } from "babylonjs/Maths/math.vector";

export abstract class GameItem {
    protected parent: GameItem;
    protected children: GameItem[] = [];
    abstract set position(pos: Vector3);
    abstract get position(): Vector3;
    abstract set position2D(pos: Vector2);

    setParent(parent: GameItem) {
        if (this.parent) {
            this.parent.removeChild(this);
        }

        this.parent = parent;

        if (this.parent) {
            this.position = this.parent.position;
    
            if (!parent.children.includes(this)) {
                parent.children.push(this);
            }
        }
    }

    getParent(): GameItem {
        return this.parent;
    }

    addChild(child: GameItem) {
        if (!this.children.includes(child)) {
            this.children.push(child);
        }
        child.parent = this;
    }

    removeChild(child: GameItem) {
        this.children = this.children.filter(c => c !== child);
        if (child.parent === this) {
            child.parent = undefined;
        }
    }
}