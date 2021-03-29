import { GameObj, GameObjectJson } from "../../model/objs/GameObj";

export interface IFactoryFeature {
    process(gameObject: GameObj, json: GameObjectJson): void;
}