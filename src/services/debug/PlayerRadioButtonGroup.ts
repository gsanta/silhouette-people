import { Container, Control, RadioButton, StackPanel } from "babylonjs-gui";
import { Lookup } from "../Lookup";
import { IGUIComponent } from "./IGUIComponent";


export class PlayerRadioButtonGroup implements IGUIComponent {
    render(parent: Container, lookup: Lookup) {
        var panel = new StackPanel();
        panel.width = "300px";
        panel.height = '60px';
        panel.isVertical = false;
        panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        
        this.addRadio('player1', panel);
        this.addRadio('player2', panel);        

        parent.addControl(panel);
    }

    private addRadio(text: string, parent: Container) {
        var button = new RadioButton();
        button.width = "20px";
        button.height = "20px";
        button.color = "white";
        button.background = "green";     

        button.onIsCheckedChangedObservable.add(function(state) {

        }); 

        var header = Control.AddHeader(button, text, "100px", { isHorizontal: true, controlFirst: true });
        header.height = "30px";

        parent.addControl(header);    
    }
}