
import * as React from 'react';
import { ComponentProps } from './ComponentProps';
import { EditorComponent } from './editor/EditorComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/main.scss';

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
            <div className="main">
                <canvas 
                    id="game-canvas"
                    onKeyDown={e => this.props.world.keyboard.keyDown(e.nativeEvent)}
                    onKeyUp={e => this.props.world.keyboard.keyUp(e.nativeEvent)}
                />
                <EditorComponent editor={this.props.world.editorService}/>
                {/* <BikePanelComponent world={this.props.world} /> */}
            </div>
        );
    }
}