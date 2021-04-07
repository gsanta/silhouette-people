import React from "react";
import { GuiProps } from './GuiProps';
import './../../assets/css/bike-panel.scss'

export class BikePanelGui extends React.Component<GuiProps> {
    render() {
        const { world } = this.props;
        const player = world.activeObj.getPlayer(); 

        if (!player || !player.player.hasBikeVechicle()) {
            return null;
        }

        const bike = player.player.getVehicle();
        let speed = bike.data.getSpeed();
        speed = Math.trunc(speed * 10) / 10;

        return (
            <div className="bike-panel">
                <div className="info-panel-header">Bike info</div>
                <div className="info-panel-body">
                    <div className="info-row">
                        <div>Speed</div>
                        <div>{speed} km/h</div>
                    </div>
                    <div className="info-row">
                        <div>Gear</div>
                        <div>{bike.data.getGear()}</div>
                    </div>
                </div>
            </div>
        );
    }
}