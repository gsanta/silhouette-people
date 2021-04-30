import { Axis, Quaternion, Vector2, Vector3 } from "babylonjs";
import { Mesh } from "babylonjs/Meshes/index";
import { MeshObj } from "./MeshObj";


export class MeshInstance {

    private meshes: Mesh[];
    private colliderMesh: Mesh;
    private meshObj: MeshObj;
    private positionChangeListeners: (() => void)[] = [];

    readonly isCloned: boolean;

    constructor(meshes: Mesh[], isCloned: boolean, meshObj: MeshObj) {
        this.meshes = meshes;
        this.isCloned = isCloned;
        this.meshObj = meshObj;
    }

    setRotation(rotation: number) {
        this.getMesh().rotationQuaternion = Quaternion.RotationAxis(Axis.Y, rotation);
    }

    getRotation(): Vector3 {
        return this.getMesh().rotationQuaternion.toEulerAngles();
    }

    setPosition2D(pos: Vector2) {
        this.getMesh().setAbsolutePosition(new Vector3(pos.x, this.getPosition().y, pos.y));

        this.emitPositionChange();
    }

    getPosition2D(): Vector2 {
        const pos = this.getMesh().getAbsolutePosition();
        return new Vector2(pos.x, pos.z);
    }

    setPosition(pos: Vector3) {
        this.getMesh().setAbsolutePosition(pos);

        this.emitPositionChange();
    }

    moveWithCollision(displacement: Vector3) {
        this.getMesh().moveWithCollisions(displacement);

        this.emitPositionChange();
    }

    getPosition(): Vector3 {
        const worldPos = this.meshObj.worldObj.ground.getAbsolutePosition()
        return this.getMesh().getAbsolutePosition().subtract(worldPos);
    }

    getDimensions(): Vector3 {
        const mesh = this.getMesh();
        return mesh.getBoundingInfo().boundingBox.extendSizeWorld;
    }

    getMesh() {
        return this.colliderMesh ? this.colliderMesh : this.meshes[0];
    }

    getAllMeshes(): Mesh[] {
        return this.meshes;
    }

    setColliderMesh(mesh: Mesh) {
        this.colliderMesh = mesh;
    }

    getColliderMesh(): Mesh {
        return this.colliderMesh;
    }

    setVisibility(isVisible: boolean) {
        this.meshes.forEach(mesh => mesh.isVisible = isVisible);
    }

    addPositionChangeListener(callback: () => void) {
        this.positionChangeListeners.push(callback);
    }

    removePositionChangeListener(callback: () => void) {
        this.positionChangeListeners = this.positionChangeListeners.filter(listener => listener !== callback);
    }

    emitPositionChange() {
        this.positionChangeListeners.forEach(listener => listener());
        this.meshObj.children.forEach(child => child.instance.emitPositionChange())
    }

    dispose() {
        this.meshes.forEach(mesh => mesh.dispose());
        if (this.colliderMesh) {
            this.colliderMesh.dispose();
        }
    }
}