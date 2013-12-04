GRID_SIZE = 5

stdin = process.openStdin()
stdin.setEncoding 'utf8'

inputCallback = null

promptForTile1 = () ->
    console.log 'Please enter coordinate for the first tile'
    inputCallback = (input) ->
        promptForTile2() if (strToCoordinates(input))

promptForTile2 = () ->
    console.log 'Please enter coordinates for the second tile'
    inputCallback = (input) ->
        if (strToCoordinates(input))
            console.log "Swapping tiles...done!"
            promptForTile1()

inRange = (x, y) -> 0 <= x < GRID_SIZE and 0 <= y < GRID_SIZE

isInteger = (num) -> num is Math.round(num)

strToCoordinates = (input) ->
    halves = input.split(',')
    if halves.length is not 2
       return console.log 'Input must be of the form x, y.'
    
    x = parseFloat halves[0]
    y = parseFloat halves[1]
    if (!isInteger(x) or !isInteger(y))
        return console.log 'Each coordinate must be an integer'
    
    if not inRange x - 1, y - 1
        return console.log "Each coordinate must be between 1 and #{GRID_SIZE}"
    
    return { x, y }

console.log 'Welcome to 5x5'
promptForTile1()
            
stdin.on 'data', (input) ->
    inputCallback input
