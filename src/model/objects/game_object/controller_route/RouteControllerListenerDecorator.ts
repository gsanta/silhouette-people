import { Vector3 } from "babylonjs";
import { GraphEdge } from "../../../../service/graph/GraphEdge";
import { GraphVertex } from "../../../../service/graph/GraphImpl";
import { RouteItem } from "../../route/RouteItem";
import { RouteController } from "./RouteController";
import { RouteControllerListener } from "./RouteControllerListener";
import { GameObject } from "../GameObject";
import { MonoBehaviour } from "../../../behaviours/MonoBehaviour";
import { MonoBehaviourName } from "../../../behaviours/MonoBehaviourName";

export class RouteControllerListenerDecorator extends MonoBehaviour implements RouteController {
    private delegate: RouteController;
    private listeners: RouteControllerListener[] = [];

    constructor(delegate: RouteController) {
        super(MonoBehaviourName.ROUTE_CONTROLLER);
        this.delegate = delegate;
    }

    getT() {
        return this.delegate.getT();
    }

    setT(t: number): void {
        this.delegate.setT(t);
    }

    update(deltaTime: number): boolean {
        const ret = this.delegate.update(deltaTime);
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
    getCharacter(): GameObject { return this.delegate.getCharacter() };

    addListener(routeWalkerListener: RouteControllerListener) {
        this.listeners.push(routeWalkerListener);
    }
}
