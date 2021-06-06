import { MeshBuilder } from "babylonjs";
import { InjectProperty } from "../../../di/diDecorators";
import { AvoidanceRadiusAttachment } from "../../../model/item/attachments/AvoidanceRadiusAttachment";
import { BikeStateInfo } from "../../../model/item/bike/BikeState";
import { CharacterItem } from "../../../model/item/character/CharacterItem";
import { MeshConfig, MeshItem, MeshObjType } from "../../../model/item/mesh/MeshItem";
import { AbstractPropertyParser } from "../../base/import/AbstractPropertyParser";
import { lookup } from "../../Lookup";
import { WorldProvider } from "../../WorldProvider";

export class MeshFactory {
    @InjectProperty('WorldProvider')
    private worldProvider: WorldProvider;

    private readonly indexesByType: Map<string, number> = new Map();
    private propertyParsers: AbstractPropertyParser<any>[] = [];

    constructor() {
        this.worldProvider = lookup.worldProvider;
    }
    setPropertyParsers(propertyParsers: AbstractPropertyParser<any>[]) {
        this.propertyParsers = propertyParsers;
    }

    createCollisionAvoidance(parentItem: MeshItem) {
        const mesh = MeshBuilder.CreateCylinder(
            `${parentItem.id}-collision-avoidance-mesh`,
            { 
                height: 1, 
                diameterTop: parentItem.radius,
                diameterBottom: parentItem.radius
            }, 
            this.worldProvider.scene
        );

        const avoidanceRadiusAttachment = new AvoidanceRadiusAttachment('avoidance-radius', parentItem);
        avoidanceRadiusAttachment.mesh = mesh;
        return avoidanceRadiusAttachment;
    }

    async createFromConfig(meshConfig: MeshConfig): Promise<MeshItem> {
        const id = this.generateId(meshConfig.type);
        let meshItem: MeshItem 
        
        if (meshConfig.type === MeshObjType.Bicycle1) {
            const character = new CharacterItem(id);
            character.info = new BikeStateInfo();
            meshItem = character;
        } else {
            meshItem = new MeshItem(id);
        }

        if (meshConfig.props) {
            await this.applyProperties(meshItem, meshConfig);
        }

        return meshItem;
    }

    
    private async applyProperties(gameObj: MeshItem, meshConfig: MeshConfig) {
        const { props } = meshConfig;

        for (let propertyParser of this.propertyParsers) {
            if (props[propertyParser.propName] !== undefined) {
                if (propertyParser.isAsync()) {
                    await propertyParser.processPropertyAsync(gameObj, props[propertyParser.propName]);
                } else {
                    propertyParser.processProperty(gameObj, props[propertyParser.propName]);
                }
            }
        }
    }

    private generateId(type: MeshObjType) {
        const currIndex = this.indexesByType.get(type) || 0;
        this.indexesByType.set(type, currIndex + 1);
        return `${type}-${currIndex}`;
    }
}