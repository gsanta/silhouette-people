import { Vector2, Vector3 } from "babylonjs/Maths/math.vector";

export abstract class GameObj {
    protected parent: GameObj;
    protected children: GameObj[] = [];
    abstract setPosition(pos: Vector3): void;
    abstract getPosition(): Vector3;
    abstract setPosition2D(pos: Vector2): void;

    setParent(parent: GameObj) {
        if (this.parent) {
            this.parent.removeChild(this);
        }

        this.parent = parent;

        if (this.parent) {
            this.setPosition(this.parent.getPosition());
    
            if (!parent.children.includes(this)) {
                parent.children.push(this);
            }
        }
    }

    getParent(): GameObj {
        return this.parent;
    }

    addChild(child: GameObj) {
        if (!this.children.includes(child)) {
            this.children.push(child);
        }
        child.parent = this;
    }

    removeChild(child: GameObj) {
        this.children = this.children.filter(c => c !== child);
        if (child.parent === this) {
            child.parent = undefined;
        }
    }
}