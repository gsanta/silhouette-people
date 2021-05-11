import { CharacterItem } from "../../model/item/character/CharacterItem";
import { RouteItem } from "../../model/item/route/RouteItem";
import { StoryItem } from "./StoryItem";

export interface RouteWalkerStoryData {
    route: RouteItem;
    character: CharacterItem;
}

export class RouteWalkerStory extends StoryItem<RouteWalkerStoryData> {

    
}