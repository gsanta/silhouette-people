

export abstract class RouteWalkerListener {
    onWalk(deltaTime: number) {}
    onFinished() {}
    onStarted() {}
    onDirectionChanged() {}
    onDestinationPointChanged() {}
}