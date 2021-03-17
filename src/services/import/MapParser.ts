import { Vector3 } from "babylonjs";
import { GameObjectType } from "../../model/game_object/GameObject";
import { World } from "../../model/World";
import { LevelJson } from "./ImportService";

export class MapParser {
    private static CONVERSION_RATIO = 1;
    private world: World;

    constructor(world: World) {
        this.world = world;
    }

    async loadAndParse(levelJson: LevelJson): Promise<void> {
        let map = await this.fetchMap(`assets/levels/${levelJson.mapUrl}`);
        map = map.split(' ').join('')
        
        const lines = map.split("\n").map(line => line.trim()).filter(line => line !== '');

        for (let i = 0; i < lines.length; i++) {
            for (let j = 0; j < lines.length; j++) {
                if (lines[i][j] !== '.') {
                    await this.world.factory.create({
                        position: new Vector3(j, 0, i),
                        type: <GameObjectType> levelJson.charToType[lines[i][j]]
                    });
                }
            }
        }
    }

    private async fetchMap(url: string): Promise<string> {
        const response = await fetch(url);
        return await response.text();
    }
}