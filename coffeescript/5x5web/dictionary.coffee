class Dictionary
    constructor: (@originalWordList, grid) ->
        @setGrid grid if grid?

    setGrid: (@grid) ->
        @wordList = @originalWordList.slice(0)
        @wordList = (word for word in @wordList when word.length <= @grid.size)
        @minWordLength = Math.min.apply(Math, (w.length for w in @wordList))
        @usedWords = []
        for x in [0...@grid.size]
            for y in [0...@grid.size]
                @markUsed word for word in @wordsThroughTile(x, y)

    wordsThroughTile: (x, y) ->
        strings = [ ]
        for length in [0...@grid.size]
            range = length - 1
            addTiles = (func) ->
                strings.push (func(i) for i in [0..range]).join ''
                
            for offset in [0...length]
                # vertical
                if @inRange(x - offset, y) and @inRange(x - offset + range, y)
                    addTiles (i) => @grid.tiles[x - offset + i][y]

                # horizontal
                if @inRange(x, y - offset) and @inRange(x, y - offset + range)
                    addTiles (i) => @grid.tiles[x][y - offset + i]

                # diagonal (upper-left to lower-right)
                if @inRange(x - offset, y - offset) and @inRange(x - offset + range, y - offset + range)
                    addTiles (i) => @grid.tiles[x - offset + i][y - offset + i]

                # digonal (lower-left to upper-right)
                if @inRange(x - offset, y + offset) and @inRange(x - offset + range, y + offset - range)
                    addTiles (i) => @grid.tiles[x - offset + i][y + offset - i]

        str for str in strings when @isWord str

    markUsed: (str) ->
        if str in @usedWords
            return false

        @usedWords.push(str)
        return true

    inRange: (x, y) -> 0 <= x < @grid.size and 0 <= y < @grid.size

    isInteger: (num) -> num is Math.round(num)


    isWord: (str) -> str in @wordList
    isNewWord: (str) -> str in @wordList and str not in @usedWords

root = exports ? window
root.Dictionary = Dictionary
