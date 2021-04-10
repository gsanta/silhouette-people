import { Container, Control, RadioButton, StackPanel } from "babylonjs-gui";
import { InjectProperty } from "../../di/diDecorators";
import { WorldObj } from "../../model/objs/WorldObj";
import { WorldProvider } from "../../stores/WorldProvider";
import { lookup, Lookup } from "../Lookup";
import { IGUIComponent } from "./IGUIComponent";


export class PlayerRadioButtonGroup implements IGUIComponent {
    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    constructor() {
        this.worldProvider = lookup.worldProvider;
    }
    
    render(parent: Container) {
        var panel = new StackPanel();
        panel.width = "300px";
        panel.height = '60px';
        panel.isVertical = false;
        panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        
        this.addRadio('player1', panel, (isActive) => {
            if (isActive) {
                this.activatePlayer('player1');
            }
        });
        this.addRadio('player2', panel, (isActive) => {
            if (isActive) {
                this.activatePlayer('player2');
            }
        });        

        parent.addControl(panel);
    }

    private activatePlayer(playerId: string) {
        const world = this.worldProvider.world;
        world.obj.getObjById(playerId).player.setActive(true);
    }

    private addRadio(text: string, parent: Container, onClick: (state: boolean) => void) {
        var button = new RadioButton();
        button.width = "20px";
        button.height = "20px";
        button.color = "white";
        button.background = "green";
        button.isChecked = false;

        button.onIsCheckedChangedObservable.add((state) => onClick(state)); 

        var header = Control.AddHeader(button, text, "100px", { isHorizontal: true, controlFirst: true });
        header.height = "30px";

        parent.addControl(header);
    }
}