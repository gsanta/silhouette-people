
import * as React from 'react';
import {World} from '../model/World';

export interface MainUIProps {
    world: World;
    onReady: () => void;
}

export class MainUI extends React.Component<MainUIProps> {

    componentDidMount() {
        this.props.onReady();
    }

    render() {
        return (
            <canvas 
                id="game-canvas"
                onKeyDown={e => this.props.world.keyboard.keyDown(e.nativeEvent)}
                onKeyUp={e => this.props.world.keyboard.keyUp(e.nativeEvent)}
            />
        )       
    }
}