import React from "react";
import { ComponentProps } from './ComponentProps';
import './../../assets/css/action-panel.scss'
import { InjectProperty } from "../di/diDecorators";
import { lookup } from "../service/Lookup";
import { BikeItem } from "../model/item/character/CharacterItem";
import { PlayerStore } from "../service/player/PlayerStore";

export class BikePanelComponent extends React.Component<ComponentProps> {

    @InjectProperty("PlayerStore")
    private playerStore: PlayerStore;

    constructor(props: ComponentProps) {
        super(props);
        this.playerStore = lookup.playerStore;
    }

    render() {
        const player = this.playerStore.getActivePlayer(); 

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