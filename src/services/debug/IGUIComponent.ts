import { AdvancedDynamicTexture } from "babylonjs-gui/2D/advancedDynamicTexture";
import { Container } from "babylonjs-gui/2D/controls/container";
import { Lookup } from "../Lookup";


export interface IGUIComponent {
    render(parent: Container | AdvancedDynamicTexture, lookup: Lookup);
}