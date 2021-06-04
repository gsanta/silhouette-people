import { Scene, NullEngine } from "babylonjs";
import { CharacterBuilder } from "./characterUtils";

global.beforeEach(() => {
    const engine = new NullEngine();
    const scene = new Scene(engine);
    (global as any).engine = engine;
    (global as any).scene = scene;
    (global as any).charBuilder = new CharacterBuilder(scene);
});