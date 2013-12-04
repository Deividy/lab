class Tribble
    constructor: () ->
        @isAlive = true
        Tribble.count++
    
    breed: () ->
        return console.log 'Im dead!' if !@isAlive
        console.log 'is born!'
        return new Tribble()
    
    die: () ->
        Tribble.count-- if (@isAlive)
        @isAlive = false

    @count: 0
    @makeTrouble: () ->
        console.log ('Trouble!' for i in [1..@count]).join(' ')


a = new Tribble()
b = new Tribble()
console.log(Tribble.count)
Tribble.makeTrouble()
b.die()
Tribble.makeTrouble()

a.breed().breed().breed()

Tribble.makeTrouble()
