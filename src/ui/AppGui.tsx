
import * as React from 'react';
import { GuiProps } from './GuiProps';
import { BikePanelGui } from './BikePanelGui';

export interface AppGuiProps extends GuiProps {
    onReady: () => void;
}

export class AppGui extends React.Component<AppGuiProps> {
    componentDidMount() {
        this.props.world.gui.setGuiRenderer(() => this.forceUpdate());
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
                <BikePanelGui world={this.props.world} />
            </div>
        );
    }
}