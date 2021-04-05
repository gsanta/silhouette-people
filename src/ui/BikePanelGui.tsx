import React from "react";
import { GuiProps } from './GuiProps';
import './../../assets/css/bike-panel.scss'
import { GameObjectType } from "../model/objs/GameObj";

export class BikePanelGui extends React.Component<GuiProps> {
    render() {
        const { world } = this.props;
        const player = world.districtStore.getPlayer(); 

        if (!player || !player.player.hasBikeVechicle()) {
            return null;
        }


        return (
            <div className="bike-panel">
                <div className="info-panel-header">Bike info</div>
                <div className="info-panel-body">
                    <div className="info-row">
                        <div>Speed</div>
                        <div>10 km/h</div>
                    </div>
                    <div className="info-row">
                        <div>Gear</div>
                        <div>2</div>
                    </div>
                </div>
            </div>
        );
    }
}