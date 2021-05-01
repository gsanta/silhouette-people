
import * as React from 'react';
import { BikePanelComponent } from './BikePanelComponent';
import { GameStageComponent } from './GameStageComponent';
import { ComponentProps } from './ComponentProps';

export interface AppComponentProps extends ComponentProps {
    onReady: () => void;
}

export class AppComponent extends React.Component<AppComponentProps> {

    componentDidMount() {
        this.props.world.renderGui.setGuiRenderer(() => this.forceUpdate());
        this.props.onReady();
    }

    render() {
        return (
            <div>
                <canvas 
                    id="game-canvas"
                    onKeyDown={e => this.props.world.keyboard.keyDown(e.nativeEvent)}
                    onKeyUp={e => this.props.world.keyboard.keyUp(e.nativeEvent)}
                />
                <BikePanelComponent world={this.props.world} />
                <GameStageComponent/>
            </div>
        );
    }
}