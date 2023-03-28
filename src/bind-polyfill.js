/**
 * Bind polyfill
 * The bind() function creates a new bound function. 
 * Calling the bound function generally results in the execution of the function it wraps, 
 * which is also called the target function. 
 * The bound function will store the parameters passed — which include the value of this and the first few arguments — as its internal state. 
 * These values are stored in advance, instead of being passed at call time. 
 * You can generally see const boundFn = fn.bind(thisArg, arg1, arg2) as being equivalent to 
 * const boundFn = (...restArgs) => fn.call(thisArg, arg1, arg2, ...restArgs) for the effect when it's called (but not when boundFn is constructed).
 * 
 * Syntax: 
 * func.bind(context, arguments);
 */

Function.prototype.customBind = function (context, /* ...args */) {
    var callback = this;
    var Prototype = callback.prototype;
    var partialArguments = Array.prototype.slice.call(arguments,1);

    var boundedFunction = function(/* ...args */) {
        var newArguments = Array.prototype.slice.call(arguments);
        var args = [...partialArguments, ...newArguments];
        return callback.apply(context, args);
    }
    
    if(typeof Prototype === 'object') {
        boundedFunction.prototype = Prototype;
    }
    return boundedFunction;
}

/** Example */
this.x = 9; // 'this' refers to the global object (e.g. 'window') in non-strict mode
const module = {
    x: 81,
    getX() {
        return this.x;
    },
};

console.log(module.getX()); // 81

const retrieveX = module.getX;
console.log(retrieveX()); // 9; the function gets invoked at the global scope

// Create a new function with 'this' bound to module
// New programmers might confuse the
// global variable 'x' with module's property 'x'
const boundGetX = retrieveX.customBind(module);
console.log(boundGetX()); // 81