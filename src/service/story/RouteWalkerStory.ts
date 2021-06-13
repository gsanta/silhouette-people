import { MeshItem } from "../../model/item/mesh/MeshItem";
import { RouteItem } from "../../model/item/route/RouteItem";
import { StoryItem } from "./StoryItem";

export interface RouteWalkerStoryData {
    route: RouteItem;
    character: MeshItem;
}

export class RouteWalkerStory extends StoryItem<RouteWalkerStoryData> {

    
}