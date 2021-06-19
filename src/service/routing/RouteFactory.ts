import { RouteController } from "../../model/objects/game_object/controller_route/RouteController";
import { RouteControllerImpl } from "../../model/objects/game_object/controller_route/RouteControllerImpl";
import { RouteControllerListenerDecorator } from "../../model/objects/game_object/controller_route/RouteControllerListenerDecorator";
import { GameObject } from "../../model/objects/game_object/GameObject";
import { ActiveEdgeUpdaterAdapter } from "../../model/objects/route/edge_update/ActiveEdgeUpdaterAdapter";
import { RotationRestrictorAdapter } from "../../model/objects/route/rotation/RotationRestrictorAdapter";
import { RouteItem } from "../../model/objects/route/RouteItem";
import { DynamicRouter } from "../../model/objects/route/routing/DynamicRouter";
import { RouterAdapter } from "../../model/objects/route/routing/RouterAdapter";
import { RouteVisualizerAdapter } from "../../model/objects/route/visualization/RouteVisualizerAdapter";


// export class RouteFactory {


//     createRouteController(route: RouteItem, character: GameObject): RouteController {
//         const walker = new RouteControllerListenerDecorator(new RouteControllerImpl(route, character));
        
//         walker.addListener(new ActiveEdgeUpdaterAdapter(walker));
//         walker.addListener(new RotationRestrictorAdapter(walker));
//         walker.addListener(new RouterAdapter(new DynamicRouter(walker, graph)));
//         walker.addListener(new RouteVisualizerAdapter(walker, this.graphService));
//     }
// }