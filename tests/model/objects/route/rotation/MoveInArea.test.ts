import { DIRECTION3 } from "../../../../../src/model/math/Rotation";
import { RouteControllerImpl } from "../../../../../src/model/objects/game_object/controller_route/RouteControllerImpl";
import { GameObject } from "../../../../../src/model/objects/game_object/GameObject";
import { MoveInArea } from "../../../../../src/model/objects/route/rotation/MoveInArea";
import { RouteItem } from "../../../../../src/model/objects/route/RouteItem";
import { CharacterBuilder } from "../../../../test_utils/characterUtils";
import { checkVector3Equal, RouteBuilder } from "../../../../test_utils/routeUtils";


declare const routeBuilder: RouteBuilder;
declare const charBuilder: CharacterBuilder;

describe('filterDirection', () => {

    it ('point inside of area, vertical edge - direction not restrected', () => {
        const char = charBuilder.pos(2, 0, 5).build();
        const route = routeBuilder.addPoint(2, 3).addPoint(2, 10).addEdgeThickness(0, 3).build();

        const moveInArea = new MoveInArea(new RouteControllerImpl(route, char));
    
        checkVector3Equal(moveInArea.filterDirection(DIRECTION3.E()), DIRECTION3.E());
        checkVector3Equal(moveInArea.filterDirection(DIRECTION3.W()), DIRECTION3.W());
        checkVector3Equal(moveInArea.filterDirection(DIRECTION3.S()), DIRECTION3.S());
        checkVector3Equal(moveInArea.filterDirection(DIRECTION3.N()), DIRECTION3.N());
        checkVector3Equal(moveInArea.filterDirection(DIRECTION3.NE()), DIRECTION3.NE());
    });

    it ('point inside of area, diagonal edge - direction not restrected', () => {
        const char = charBuilder.pos(5, 0, 6).build();
        const route = routeBuilder.addPoint(2, 3).addPoint(10, 11).addEdgeThickness(0, 3).build();

        const moveInArea = new MoveInArea(new RouteControllerImpl(route, char));
    
        checkVector3Equal(moveInArea.filterDirection(DIRECTION3.E()), DIRECTION3.E());
        checkVector3Equal(moveInArea.filterDirection(DIRECTION3.W()), DIRECTION3.W());
        checkVector3Equal(moveInArea.filterDirection(DIRECTION3.S()), DIRECTION3.S());
        checkVector3Equal(moveInArea.filterDirection(DIRECTION3.N()), DIRECTION3.N());
        checkVector3Equal(moveInArea.filterDirection(DIRECTION3.NE()), DIRECTION3.NE());
    });

    describe ('point outside of area on left side, vertical edge', () => {
        let char: GameObject;
        let route: RouteItem;
        let moveInArea: MoveInArea;

        beforeEach(() => {
            char = charBuilder.pos(-1.1, 0, 6).build();
            route = routeBuilder.addPoint(2, 3).addPoint(2, 10).addEdgeThickness(0, 3).build();
            moveInArea = new MoveInArea(new RouteControllerImpl(route, char));
        });

        it ('west direction - restricted', () => {
            checkVector3Equal(moveInArea.filterDirection(DIRECTION3.W()), DIRECTION3.N());
        });

        it ('south direction - restricted', () => {
            checkVector3Equal(moveInArea.filterDirection(DIRECTION3.S()), DIRECTION3.N());
        });

        it ('north-west direction - restricted', () => {
            checkVector3Equal(moveInArea.filterDirection(DIRECTION3.NW()), DIRECTION3.N());
        });

        it ('north direction - not restricted', () => {
            checkVector3Equal(moveInArea.filterDirection(DIRECTION3.N()), DIRECTION3.N());
        });

        it ('north-east direction - not restricted', () => {
            checkVector3Equal(moveInArea.filterDirection(DIRECTION3.NE()), DIRECTION3.NE());
        });
    });

    describe ('point outside of area on right side, vertical edge', () => {
        let char: GameObject;
        let route: RouteItem;
        let moveInArea: MoveInArea;

        beforeEach(() => {
            char = charBuilder.pos(3.1, 0, 6).build();
            route = routeBuilder.addPoint(2, 3).addPoint(2, 10).addEdgeThickness(0, 2).build();
            moveInArea = new MoveInArea(new RouteControllerImpl(route, char));
        });

        it ('west direction - not restricted', () => {
            checkVector3Equal(moveInArea.filterDirection(DIRECTION3.W()), DIRECTION3.W());
        });
        
        it ('north-west direction - not restricted', () => {
            checkVector3Equal(moveInArea.filterDirection(DIRECTION3.NW()), DIRECTION3.NW());
        });

        it ('south direction - restricted', () => {
            checkVector3Equal(moveInArea.filterDirection(DIRECTION3.S()), DIRECTION3.N());
        });

        it ('north direction - restricted', () => {
            checkVector3Equal(moveInArea.filterDirection(DIRECTION3.N()), DIRECTION3.N());
        });

        it ('north-east direction - restricted', () => {
            checkVector3Equal(moveInArea.filterDirection(DIRECTION3.NE()), DIRECTION3.N());
        });
    });

    describe ('point outside of area on left side, diagonal edge', () => {
        let char: GameObject;
        let route: RouteItem;
        let moveInArea: MoveInArea;

        beforeEach(() => {
            char = charBuilder.pos(5, 0, 7).build();
            route = routeBuilder.addPoint(2, 3).addPoint(10, 11).addEdgeThickness(0, 2).build();
            moveInArea = new MoveInArea(new RouteControllerImpl(route, char));
        });

        it ('north direction - restricted', () => {
            checkVector3Equal(moveInArea.filterDirection(DIRECTION3.N()), DIRECTION3.NE());
        });

        it ('west direction - restricted', () => {
            checkVector3Equal(moveInArea.filterDirection(DIRECTION3.W()), DIRECTION3.NE());
        });

        it ('south direction - restricted', () => {
            checkVector3Equal(moveInArea.filterDirection(DIRECTION3.S()), DIRECTION3.NE());
        });

        it ('north-west direction - restricted', () => {
            checkVector3Equal(moveInArea.filterDirection(DIRECTION3.NW()), DIRECTION3.NE());
        });

        it ('north-east direction - not restricted', () => {
            checkVector3Equal(moveInArea.filterDirection(DIRECTION3.NE()), DIRECTION3.NE());
        });

        it ('east direction - not restricted', () => {
            checkVector3Equal(moveInArea.filterDirection(DIRECTION3.E()), DIRECTION3.E());
        });
    });
});