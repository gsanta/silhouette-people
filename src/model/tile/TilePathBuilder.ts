import { TileObj } from "../general/objs/TileObj";

export class TilePathBuilder {
    private tilePath: TileObj[] = [];

    add(tile: TileObj) {
        this.tilePath.push(tile);
    }

    getPath(): TileObj[] {
        return this.tilePath;
    }
}