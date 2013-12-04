{ Dictionary } = require('./dictionary')
{ Grid } = require('./grid')
{ Player } = require('./player')
{ OWL2 } = require('./OWL2')

stdin = process.openStdin()

dic = new Dictionary(OWL2)
grid = new Grid()
dic.setGrid(grid)

p = new Player('John Doe')

inputCallback = null
console.log "Please choose a tile in the form (x, y)"

promptForTile1 = () ->
    printGrid()
    console.log "Please enter coordinates for the first tile"
    inputCallback = (input) ->
        try
            {x, y} = strToCoordinates input
        catch e
            console.log e
            return

        promptForTile2 x, y


promptForTile2 = (x1, y1) ->
    console.log "Please enter coordinates for the second tile."
    inputCallback = (input) ->
        try
            {x: x2, y: y2} = strToCoordinates input
        catch e
            console.log e
            return
        
        if x1 is x2 and y1 is y2
            console.log "The second tile must be different from the first"
        else
            console.log "Swapping (#{x1}, #{y1}) with (#{x2}, #{y2}) ..."
            x1--; x2--; y1--; y2--; # convert 1-based indices to 0-based
            [ grid[x1][y1], grid[x2][y2] ] = [ grid[x2][y2], grid[x1][y1] ]
            { moveScore, newWords } = scoreMove grid, {x1, y2, x2, y2}
            unless moveScore is 0
                console.log """You formed the following word(s): #{newWords.join(', ')}"""
                score += moveScore
            moveCount++


console.log "Your score after #{moveCount} moves: #{score}"
promptForTile1()

stdin.setEncoding 'utf8'


stdin.on 'data', (input) ->
    inputCallback(input)
