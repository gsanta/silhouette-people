import { AnimationGroup } from "babylonjs";


export class AnimationHandler {
    private animationGroups: AnimationGroup[];
    private currentAnimation: AnimationGroup;

    setAnimations(animationGroups: AnimationGroup[]) {
        this.animationGroups = animationGroups;
    }

    isAnimationRunning(name: string) {
        return this.currentAnimation && this.currentAnimation.name === name;
    }

    runAnimation(name: string) {
        const animationGroup = this.animationGroups.find(group => group.name === name);
        if (animationGroup) {
            animationGroup.start(true);
            this.currentAnimation = animationGroup;
        }
    }

    stopCurrentAnimation() {
        if (this.currentAnimation) {
            this.currentAnimation.stop();
            this.currentAnimation = undefined;
        }
    }

    getAnimations(): AnimationGroup[] {
        return this.animationGroups;
    }
}