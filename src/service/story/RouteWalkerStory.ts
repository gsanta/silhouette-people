import { GameObject } from "../../model/objects/game_object/GameObject";
import { RouteItem } from "../../model/objects/route/RouteItem";
import { StoryItem } from "./StoryItem";

export interface RouteWalkerStoryData {
    route: RouteItem;
    character: GameObject;
}

export class RouteWalkerStory extends StoryItem<RouteWalkerStoryData> {

    
}