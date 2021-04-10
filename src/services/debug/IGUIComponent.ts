import { AdvancedDynamicTexture } from "babylonjs-gui/2D/advancedDynamicTexture";
import { Container } from "babylonjs-gui/2D/controls/container";

export interface IGUIComponent {
    render(parent: Container | AdvancedDynamicTexture);
}