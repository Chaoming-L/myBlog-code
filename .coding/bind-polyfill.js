if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== 'function') {
            throw new TypeError('this is not function!')
        }

        var self = this,
            Func = function () {},
            args = Array.prototype.slice.call(arguments, 1),
            bound = function() {
                return self.apply(this instanceof func 
                    ? this 
                    : oThis || this
                    , args.concat(Array.prototype.slice.call(arguments))
                )
            }
        
        Func.prototype = self.prototype;
        bound.prototype = new Func()

        return bound 
    }
}