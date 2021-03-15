import { GameObjectJson } from "../../model/game_object/GameObject";


export class MapParser {

    private static CONVERSION_RATIO = 1;

    constructor() {

    }

    async loadAndParse(url: string): Promise<GameObjectJson[]> {
        let map = await this.fetchMap(url);
        map = map.split(' ').join('')
        
        const lines = map.split("\n");

        for (let i = 0; i < lines.length; i++) {
            for (let j = 0; j < lines.length; j++) {
                
            }
        }

        return undefined;
    }

    private async fetchMap(url: string): Promise<string> {
        const response = await fetch(url);
        return await response.text();
    }
}