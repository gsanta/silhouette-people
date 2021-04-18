import React from "react";
import { ComponentProps } from './ComponentProps';
import './../../assets/css/bike-panel.scss'
import { InjectProperty } from "../di/diDecorators";
import { MeshStore } from "../stores/MeshStore";
import { lookup } from "../services/Lookup";
import { Bike } from "../model/general/objs/MeshObj";

export class BikePanelComponent extends React.Component<ComponentProps> {

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    constructor(props: ComponentProps) {
        super(props);
        this.meshStore = lookup.meshStore;
    }

    render() {
        const player = this.meshStore.getActivePlayer(); 

        if (!player || !player.getParent()) {
            return null;
        }

        const bike = player.getParent() as Bike;
        let speed = bike.state.getSpeed();
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
                        <div>{bike.state.getGear()}</div>
                    </div>
                </div>
            </div>
        );
    }
}