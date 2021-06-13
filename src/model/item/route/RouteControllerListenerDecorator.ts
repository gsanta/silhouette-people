import { Vector3 } from "babylonjs";
import { GraphEdge } from "../../../service/graph/GraphEdge";
import { GraphVertex } from "../../../service/graph/GraphImpl";
import { RouteItem } from "./RouteItem";
import { RouteController } from "./RouteController";
import { RouteControllerListener } from "./RouteControllerListener";
import { MeshItem } from "../mesh/MeshItem";

export class RouteControllerListenerDecorator implements RouteController {

    private delegate: RouteController;
    private listeners: RouteControllerListener[] = [];

    constructor(delegate: RouteController) {
        this.delegate = delegate;
    }

    walk(deltaTime: number): boolean {
        const ret = this.delegate.walk(deltaTime);
        if (ret) {
            this.listeners.forEach(listener => listener.onWalk(deltaTime));
        }
        return ret;
    }

    setStarted(isStarted: boolean): void {
        if (isStarted) {
            this.listeners.forEach(listener => listener.onStarted());
        } else {
            this.listeners.forEach(listener => listener.onFinished());
        }

        this.delegate.setStarted(isStarted);

    }
    isStarted(): boolean { return this.delegate.isStarted(); }
    isRunning(): boolean { return this.delegate.isRunning(); }

    reverseRoute(): void { 
        this.delegate.reverseRoute();

        this.listeners.forEach(listener => listener.onDirectionChanged());
        this.listeners.forEach(listener => listener.onEnterEdge());
    }
    getPos(): Vector3 { return this.delegate.getPos(); }
    getPrevPos(): Vector3 { return this.delegate.getPrevPos(); }
    getEdge(): GraphEdge { return this.delegate.getEdge(); }
    setEdge(edge: GraphEdge): void {
        if (this.getCharacter().id === 'C') {
            console.log(edge.toString());
        }
        this.delegate.setEdge(edge);
        this.listeners.forEach(listener => listener.onEnterEdge());
    }
    getTarget(): GraphVertex { return this.delegate.getTarget(); }
    getSource(): GraphVertex { return this.delegate.getSource(); }
    getRoute() { return this.delegate.getRoute() }
    setRoute(route: RouteItem): void { 
        this.delegate.setRoute(route); 
        this.listeners.forEach(listener => listener.onRouteChanged());
    }
    getCharacter(): MeshItem { return this.delegate.getCharacter() };

    addListener(routeWalkerListener: RouteControllerListener) {
        this.listeners.push(routeWalkerListener);
    }
}
