_ = require('underscore')
EventEmitter = require('events').EventEmitter

class Test1
    constructor: (@dl) ->
        @db = 'testing'

    getEnv: () -> @dl

class Test2 extends EventEmitter
    constructor: (@dl) ->
        t = new Test1(@dl)
        _.extend(@, _.extend(t, @))

    test: () ->
        @emit('test', 'oieee')
        return 'testa meu'

c = new Test2('test it ing')
c.on('test', console.log)
console.log c.getEnv()
console.log c.test()

