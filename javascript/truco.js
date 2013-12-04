// Creates a new enumerated type.
// namesToValues: specifies the names and values of each instance of the class
// return: constructor that identifiers the new class 
function enumeration(namesToValues) {
    var enumeration = function() { throw "Can't Instantiate Enumerations" };
    
    var proto = enumeration.prototype = {
        constructor: enumeration,
        toString: function() { 
            return this.name; 
        },
        valueOf: function() { 
            return this.value; 
        },
        toJSON: function() { 
            return this.name; 
        }
    };

    enumeration.values = [ ];

    for(name in namesToValues) {
        var e = Object.create(proto);
        
        e.name = name;
        e.value = namesToValues[name];
        
        enumeration[name] = e;
        enumeration.values.push(e);
    }

    enumeration.foreach = function(f, c) {
        for(var i = 0; i < this.values.length; i++) {
            f.call(c, this.values[i]);
        }
    };

    return enumeration;
}


function Card(suit, rank) {
    this.suit = suit;
    this.rank = rank;
}

// Define the suit and rank values 
Card.Suit = enumeration({ 
    Clubs: 4,
    Hearts: 3,
    Spades: 2,
    Diamonds: 1
});
Card.Rank = enumeration({
    Four: 2,
    Five: 3,
    Six: 4,
    Seven: 5,
    Eight: 6,
    Nine: 7,
    Ten: 8,
    Jack: 9,
    Queen: 10,
    King: 11,
    Ace: 12,
    Two: 13,
    Three: 14
});

// Order 
Card.orderBySuit = function(a, b) {
    if (a.suit < b.suit) {
        return -1;
    }
    if (a.suit > b.suit) {
        return 1;
    }
    if (a.rank < b.rank) {
        return -1;
    }
    if (a.rank > b.rank) {
        return 1;
    }
    return 0;
}

// Define a textual representation for a card 
Card.prototype.toString = function() {
    return this.rank.toString() + " " + this.suit.toString();
};

// Compare the values of two cards 
Card.prototype.compareTo = function (that) {
    if (this.rank < that.rank) {
        return -1;
    }
    if (this.rank > that.rank) {
        return 1;
    }
    return 0;
}


function Deck() {
    var cards = this.cards = [];
    
    Card.Suit.foreach(function(s) {
        Card.Rank.foreach(function(r){ 
            cards.push(new Card(s, r));
        });
    });
}

// shuffles cards in place and returns the deck 
Deck.prototype.shuffle = function() {
    var deck = this.cards, 
        len = deck.length;
    for(var i = len - 1; i > 0; i--) {
        var r = Math.floor(Math.random() * (i + 1)), 
            temp;

        temp = deck[i], 
             deck[i] = deck[r],
             deck[r] = temp;
    }
    
    return this;
};

// returns an array of cards 
Deck.prototype.deal = function(n) {
    if (this.cards.length < n) {
        throw "Out of cards";
    }
    return this.cards.splice(this.cards.length - n, n);
};


function Player(name) {
    this.name = name;
    this.cards = [ ];
    this.score = 0;
}

Player.prototype.play = function() {
    return this.cards.pop();
}

function Game(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.match;
    this.lastPlayer;
}

Game.prototype.newMatch = function() {
    this.match = new Match(this.player1, this.player2)
};

function Match(player1, player2) {
    this.deck = new Deck().shuffle();
    this.player1 = player1;
    this.player2 = player2;
    this.manila = null;
    this.turn = null;
    this.lastPlayer = player1;
};

Match.prototype.getManilaByCard = function(card) {
    return card; 
};

Match.prototype.deal = function() {
    var deck = this.deck.shuffle();
    this.turn = deck.deal(1);
    this.manila = this.getManilaByCard(this.turn);

    this.player1.cards = deck.deal(3).sort(Card.orderBySuit);
    this.player2.cards = deck.deal(3).sort(Card.orderBySuit);
};

Match.prototype.player = function() {
    if (this.lastPlayer == this.player1) {
        return this.lastPlayer = this.player2;
    }
    return this.lastPlayer = this.player1;
};

Match.prototype.firstStreet = function() {
    var player1 = this.player(),
        player2 = this.player();

    console.log("Manila :");
    console.log(this.manila);
    console.log("First Player: " + player1.name);
    console.log(player1.play());
    console.log("Second Player: " + player2.name);
    console.log(player2.play());
};

Game.newGame = function(player1, player2) {
    if (!(player1 instanceof Player)) { 
        player1 = new Player(player1);
    }
    if (!(player2 instanceof Player)) {
        player2 = new Player(player2);
    }
    
    return new Game(player1, player2);
}

var game = Game.newGame('deividy', 'ana');
game.newMatch();
game.match.deal();

game.match.firstStreet();
game.lastPlayer = game.match.firstPlayer;
