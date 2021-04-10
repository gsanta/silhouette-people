

export function InjectProperty(dependencyId: string): Function {
    // return (prototype: any, propertyName: string): void => {
    //     if (!prototype.__injections__) {
    //         prototype.__injections__ = [];
    //     }

    //     prototype.__injections__.push([ propertyName, dependencyId ]);
    // };
    return () => {}
}

export function InjectableClass(): Function {
    return makeConstructorInjectable;
}

function makeConstructorInjectable(origConstructor: Function): Function {

    if (!origConstructor.prototype.__injections__) {
        origConstructor.prototype.__injections__ = []; 
    }

    const proxyHandler: ProxyHandler<any> = {  
        construct(target: any, args: any[], newTarget: any) {
            const obj = Reflect.construct(target, args, newTarget);

            try {
                // ... and then resolve property dependencies.
                const injections = origConstructor.prototype.__injections__ ;
                resolvePropertyDependencies(obj, injections);
            }
            catch (err) {
                // ... log the error ...
                throw err;
            }
        
            return obj;
        }
    };

    return new Proxy(origConstructor, proxyHandler);
}

function resolvePropertyDependencies(obj: any, injections: any[]) {

}