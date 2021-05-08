import React from "react";
import { ComponentProps } from './ComponentProps';
import './../../assets/css/action-panel.scss'
import { InjectProperty } from "../di/diDecorators";
import { MeshStore } from "../store/MeshStore";
import { lookup } from "../service/Lookup";
import { BikeItem } from "../model/item/character/CharacterItem";

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

        const bike = player.getParent() as BikeItem;
        let speed = bike.walker.getSpeed();
        speed = Math.trunc(speed * 10) / 10;

        return (
            <div className="action-panel">
                <div className="action-panel-header">Bike info</div>
                <div className="action-panel-body">
                    <div className="info-row">
                        <div>Speed</div>
                        <div>{speed} km/h</div>
                    </div>
                    <div className="info-row">
                        <div>Gear</div>
                        <div>{bike.walker.getGear()}</div>
                    </div>
                </div>
            </div>
        );
    }
}