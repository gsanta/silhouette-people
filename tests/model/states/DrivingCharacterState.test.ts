import { Vector2 } from 'babylonjs';
import { GameObj } from '../../../src/model/objs/GameObj';
import { BicycleVelocityPhysics } from '../../../src/model/states/BicycleMovement';

function roundVector(vec: Vector2) {
    const x = Math.floor(vec.x * 1000) / 1000;
    const y = Math.floor(vec.y * 1000) / 1000;
    return new Vector2(x, y);
}

describe('Calculating bike velocity', () => {

    it ('can calculate with gears', () => {
        const bicycleMovement = new BicycleVelocityPhysics();

        bicycleMovement.setGearRatios({'1': 2, '2': 1, '3': 0.5});
        const velocity = new Vector2(0, 0);
        const direction = new Vector2(0, 1)
        const deltaTime = 1;

        bicycleMovement.setGear(1);
        let newVelocity = bicycleMovement.getVelocity(velocity, direction, deltaTime);

        expect(roundVector(newVelocity).toString()).toEqual('{X: 0 Y: 2.222}');

        bicycleMovement.setGear(2);
        newVelocity = bicycleMovement.getVelocity(velocity, direction, deltaTime);

        expect(roundVector(newVelocity).toString()).toEqual('{X: 0 Y: 1.111}');

        bicycleMovement.setGear(3);
        newVelocity = bicycleMovement.getVelocity(velocity, direction, deltaTime);

        expect(roundVector(newVelocity).toString()).toEqual('{X: 0 Y: 0.555}');
    });

    it ('can calculate with times', () => {
        const bicycleMovement = new BicycleVelocityPhysics();

        bicycleMovement.setGearRatios({'1': 2, '2': 1, '3': 0.5});
        const velocity = new Vector2(0, 0);
        const direction = new Vector2(0, 1)
        
        let deltaTime = 1;
        let newVelocity = bicycleMovement.getVelocity(velocity, direction, deltaTime);

        expect(roundVector(newVelocity).toString()).toEqual('{X: 0 Y: 1.111}');

        deltaTime = 2;
        newVelocity = bicycleMovement.getVelocity(velocity, direction, deltaTime);

        expect(roundVector(newVelocity).toString()).toEqual('{X: 0 Y: 2.222}');

        deltaTime = 3;
        newVelocity = bicycleMovement.getVelocity(velocity, direction, deltaTime);

        expect(roundVector(newVelocity).toString()).toEqual('{X: 0 Y: 3.333}');
    });
});