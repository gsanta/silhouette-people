
import * as React from 'react';
import { ComponentProps } from './ComponentProps';
import { MeshLoaderComponent } from './editor/MeshLoaderComponent';
import { EditorComponent } from './editor/EditorComponent';

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
                <EditorComponent editor={this.props.world.editorService}/>
                {/* <BikePanelComponent world={this.props.world} /> */}
            </div>
        );
    }
}