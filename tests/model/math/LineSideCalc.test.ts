import { Vector2 } from "babylonjs";
import { LineSideCalc } from "../../../src/model/math/LineSideCalc";
import { Line } from "../../../src/model/math/shapes/Line";


describe('determineSide', () => {
    describe('vertical line', () => {
        it ('coords not flipped - left side', () => {
            const line = new Line(new Vector2(2, 1), new Vector2(2, 10));
            const side = new LineSideCalc(line).determineSide(new Vector2(1, 5));
    
            expect(side).toBeGreaterThan(0);
        });
    
        it ('coords flipped - left side', () => {
            const line = new Line(new Vector2(2, 10), new Vector2(2, 1));
            const side = new LineSideCalc(line).determineSide(new Vector2(1, 5));
        
            expect(side).toBeGreaterThan(0);
        });
    
        it ('coords not flipped - right side', () => {
            const line = new Line(new Vector2(2, 1), new Vector2(2, 10));
            const side = new LineSideCalc(line).determineSide(new Vector2(3, 5));
        
            expect(side).toBeLessThan(0);
        });
    
        it ('coords flipped - right side', () => {
            const line = new Line(new Vector2(2, 10), new Vector2(2, 1));
            const side = new LineSideCalc(line).determineSide(new Vector2(3, 5));
        
            expect(side).toBeLessThan(0);
        });
    });

    describe('horizontal line', () => {
        it ('coords not flipped - left side', () => {
            const line = new Line(new Vector2(-2, 1), new Vector2(10, 1));
            const side = new LineSideCalc(line).determineSide(new Vector2(1, 2));
    
            expect(side).toBeGreaterThan(0);
        });
    
        it ('coords flipped - left side', () => {
            const line = new Line(new Vector2(-1, -1), new Vector2(-5, -1));
            const side = new LineSideCalc(line).determineSide(new Vector2(-3, 2));
        
            expect(side).toBeGreaterThan(0);
        });
    
        it ('coords not flipped - right side', () => {
            const line = new Line(new Vector2(-2, -1), new Vector2(10, -1));
            const side = new LineSideCalc(line).determineSide(new Vector2(0, -1.1));
    
            expect(side).toBeLessThan(0);
        });
    
        it ('coords flipped - right side', () => {
            const line = new Line(new Vector2(10, -1), new Vector2(-2, -1));
            const side = new LineSideCalc(line).determineSide(new Vector2(0, -1.1));
        
            expect(side).toBeLessThan(0);
        });
    });


    describe('positive diagonal line', () => {

        describe('only positive coordinates', () => {
            it ('coords not flipped - left side', () => {
                const line = new Line(new Vector2(2, 2), new Vector2(8, 8));
                const side = new LineSideCalc(line).determineSide(new Vector2(4, 5));
            
                expect(side).toBeGreaterThan(0);
            });
        
            it ('coords flipped - left side', () => {
                const line = new Line(new Vector2(8, 8), new Vector2(2, 2));
                const side = new LineSideCalc(line).determineSide(new Vector2(4, 5));
            
                expect(side).toBeGreaterThan(0);
            });
        
            it ('coords not flipped - right side', () => {
                const line = new Line(new Vector2(2, 2), new Vector2(8, 8));
                const side = new LineSideCalc(line).determineSide(new Vector2(4, 3));
            
                expect(side).toBeLessThan(0);
            });
        
            it ('coords flipped - right side', () => {
                const line = new Line(new Vector2(8, 8), new Vector2(2, 2));
                const side = new LineSideCalc(line).determineSide(new Vector2(4, 3));
            
                expect(side).toBeLessThan(0);
            });
        });
    });

    describe('negative diagonal line', () => {
        describe('only positive coordinates', () => {
            it ('coords not flipped - left side', () => {
                const line = new Line(new Vector2(2, 8), new Vector2(7, 3));
                const side = new LineSideCalc(line).determineSide(new Vector2(3, 6));
            
                expect(side).toBeGreaterThan(0);
            });
        
            it ('coords flipped - left side', () => {
                const line = new Line(new Vector2(7, 3), new Vector2(2, 8));
                const side = new LineSideCalc(line).determineSide(new Vector2(3, 6));
            
                expect(side).toBeGreaterThan(0);
            });

            it ('coords not flipped - right side', () => {
                const line = new Line(new Vector2(2, 8), new Vector2(7, 3));
                const side = new LineSideCalc(line).determineSide(new Vector2(3, 8));
            
                expect(side).toBeLessThan(0);
            });
        
            it ('coords flipped - right side', () => {
                const line = new Line(new Vector2(7, 3), new Vector2(2, 8));
                const side = new LineSideCalc(line).determineSide(new Vector2(3, 8));
            
                expect(side).toBeLessThan(0);
            });
        });

        describe('only negative coordinates', () => {
            it ('coords not flipped - left side', () => {
                const line = new Line(new Vector2(-7, -8), new Vector2(-3, -2));
                const side = new LineSideCalc(line).determineSide(new Vector2(-5, -3));
            
                expect(side).toBeGreaterThan(0);
            });
        
            it ('coords flipped - left side', () => {
                const line = new Line(new Vector2(-3, -2), new Vector2(-7, -8));
                const side = new LineSideCalc(line).determineSide(new Vector2(-5, -3));
            
                expect(side).toBeGreaterThan(0);
            });

            it ('coords not flipped - right side', () => {
                const line = new Line(new Vector2(-7, -8), new Vector2(-3, -2));
                const side = new LineSideCalc(line).determineSide(new Vector2(-4, -5));
            
                expect(side).toBeLessThan(0);
            });
        
            it ('coords flipped - right side', () => {
                const line = new Line(new Vector2(-3, -2), new Vector2(-7, -8));
                const side = new LineSideCalc(line).determineSide(new Vector2(-4, -5));
            
                expect(side).toBeLessThan(0);
            });
        });

        describe('mixed positive and negative coordinates', () => {
            it ('coords not flipped - left side', () => {
                const line = new Line(new Vector2(-7, -8), new Vector2(3, 2));
                const side = new LineSideCalc(line).determineSide(new Vector2(-4, -1));
            
                expect(side).toBeGreaterThan(0);
            });
        
            it ('coords flipped - left side', () => {
                const line = new Line(new Vector2(-1, 2), new Vector2(-7, -8));
                const side = new LineSideCalc(line).determineSide(new Vector2(-4, -1));
            
                expect(side).toBeGreaterThan(0);
            });

            it ('coords not flipped - right side', () => {
                const line = new Line(new Vector2(-7, -8), new Vector2(3, 2));
                const side = new LineSideCalc(line).determineSide(new Vector2(3, 0));
            
                expect(side).toBeLessThan(0);
            });
        
            it ('coords flipped - right side', () => {
                const line = new Line(new Vector2(-1, 2), new Vector2(-7, -8));
                const side = new LineSideCalc(line).determineSide(new Vector2(-1, 1));
            
                expect(side).toBeLessThan(0);
            });
        });
    });
});