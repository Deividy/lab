class Player
    constructor: (@name, dictionary) ->
        @setDictionary dictionary if dictionary?

    setDictionary: (@dictionary) ->
        @score = 0
        @moveCount = 0

    makeMove: (swapCoordinates) ->
        @dictionary.grid.swap swapCoordinates
        moveCount++
        result = scoreMove(@dictionary, swapCoordinates)
        @score += result.moveScore
        return result

root = exports ? window
root.Player = Player
