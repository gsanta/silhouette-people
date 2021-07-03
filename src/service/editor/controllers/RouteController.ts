import { GameObject } from "../../../model/objects/game_object/GameObject";
import { RouteJson } from "../../../model/objects/route/RouteItem";
import { RouteStore } from "../../../store/RouteStore";
import { EventService } from "../../EventService";
import { GraphService } from "../../graph/GraphService";
import { RenderGuiService } from "../../RenderGuiService";
import { RouteFactory } from "../../routing/RouteFactory";


export class RouteController {

    private readonly eventService: EventService;
    private readonly renderGuiService: RenderGuiService;
    private readonly graphService: GraphService;
    private readonly routeStore: RouteStore;
    private readonly routeFactory: RouteFactory;

    private _from: string;
    private _to: string;
    private gameObject: GameObject;

    constructor(renderGuiService: RenderGuiService, eventService: EventService, graphService: GraphService, routeStore: RouteStore, routeFactory: RouteFactory) {
        this.eventService = eventService;
        this.renderGuiService = renderGuiService;
        this.graphService = graphService;
        this.routeStore = routeStore;
        this.routeFactory = routeFactory;
        this.eventService.guiEvents.onGameObjectSelected(gameObject => this.onGameObjectSelected(gameObject));
    }

    isVisible(): boolean {
        return !!this.gameObject;
    }

    get from() {
        return this._from;
    }

    set from(from: string) {
        this._from = from;
        this.renderGuiService.render();
    }

    get to() {
        return this._to;
    }

    set to(to: string) {
        this._to = to;
        this.renderGuiService.render();
    }

    createRoute() {
        const graph = this.graphService.getGraph();
        const fromVertex = graph.getById(this.from);
        const toVertex = graph.getById(this.to);

        if  (fromVertex && toVertex) {
            const routeJson: RouteJson = { toVertex: toVertex.id, fromVertex: fromVertex.id, gameObjectId: this.gameObject.id };
            this.routeStore.addRoute(routeJson);
            this.routeFactory.create(routeJson);
        }
    }

    onGameObjectSelected(gameObject: GameObject) {
        this.gameObject = gameObject;
        this.renderGuiService.render();
    }
}