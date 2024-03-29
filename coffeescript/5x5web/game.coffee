fs = require 'fs'
stdin = process.openStdin()

GRID_SIZE = 5; MIN_WORD_LENGTH = 2
inputCallback = null
stdin.setEncoding 'utf8'

owl2 = fs.readFileSync 'OWL2.txt', 'utf8'
wordList = owl2.match /^(\w+)/mg
wordList = (word for word in wordList when word.length <= GRID_SIZE)
isWord = (str) -> str in wordList

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

# http://www.hasbro.com/scrabble/en_US/faqGeneral.cfm
tileCounts =
    A: 9, B: 2, C: 2, D: 4, E: 12, F: 2, G: 3, H: 2, I: 9, J: 1, K: 1, L: 4
    M: 2, N: 6, O: 8, P: 2, Q: 1, R: 6, S: 4, T: 6, U: 4, V: 2, W: 2, X: 1
    Y: 2, Z: 1

totalTiles = 0
totalTiles += count for letter, count of tileCounts

# JS hashes are unordered, so we need to make our own key array
alphabet = (letter for letter of tileCounts).sort()

randomLetter = () ->
    randomNumber = Math.ceil(Math.random() * totalTiles)
    x = 1
    for letter in alphabet
        x += tileCounts[letter]
        return letter if (x > randomNumber)


# grid is a 2D array: grid[col][row], where 0, 0 is the upper-left corner
grid = for x in [0...GRID_SIZE]
    for y in [0...GRID_SIZE]
        randomLetter()


printGrid = () ->
    rows = for x in [0...GRID_SIZE]
        for y in [0...GRID_SIZE]
            grid[y][x]

    rowStrings = (' ' + row.join(' | ') for row in rows)
    rowSeparator = ('-' for i in [1...GRID_SIZE * 4]).join('')
    console.log '\n' + rowStrings.join("\n#{rowSeparator}\n") + '\n'
    

# Each letter has the same point value as in Scrabble.
tileValues =
    A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, L: 1
    M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8
    Y: 4, Z: 10

moveCount = 0
score = 0
usedWords = [ ]

scoreMove = (grid, swapCoordinates) ->
    { x1, x2, y1, y2 } = swapCoordinates
    words = wordsThroughTile(grid, x1, y1).concat wordsThroughTile(grid, x2, y2)
    moveScore = multiplier = 0
    newWords = [ ]
    for word in words when word not in usedWords and word not in newWords
        multiplier++
        moveScore += tileValues[letter] for letter in word
        newWords.push word

    usedWords = usedWords.concat newWords
    moveScore *= multiplier
    return { moveScore, newWords }

nwordsThroughTile = (grid, x, y) ->
    strings = [ ]
    for length in [MIN_WORD_LENGTH..GRID_SIZE]
        range = length - 1
        addTiles = (func) ->
            strings.push (func(i) for i in [0..range]).join ''
            
        for offset in [0...length]
            # vertical
            if inRange(x - offset, y) and inRange(x - offset + range, y)
                addTiles (i) -> grid[x - offset + i][y]

            # horizontal
            if inRange(x, y - offset) and inRange(x, y - offset + range)
                addTiles (i) -> grid[x][y - offset + i]

            # diagonal (upper-left to lower-right)
            if inRange(x - offset, y - offset) and inRange(x - offset + range, y - offset + range)
                addTiles (i) -> grid[x - offset + i][y - offset + i]

            # digonal (lower-left to upper-right)
            if inRange(x - offset, y + offset) and inRange(x - offset + range, y + offset - range)
                addTiles (i) -> grid[x - offset + i][y + offset - i]

    str for str in strings when isWord str

console.log "Welcome to 5x5!"
for x in [0...GRID_SIZE]
    for y in [0...GRID_SIZE]
        scoreMove grid, { x1: x, x2: x, y1: y, y2: y }

unless usedWords.length is 0
    console.log """Initially used words: #{usedWords.join('')}"""

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

stdin.on 'data', (input) ->
    inputCallback input
