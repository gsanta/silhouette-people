import { SceneExporter } from "../export/SceneExporter";


export class SceneExportController {

    private readonly sceneExporter: SceneExporter;

    constructor(sceneExporter: SceneExporter) {
        this.sceneExporter = sceneExporter;
    }

    export() {
        this.sceneExporter.export();
    }
}