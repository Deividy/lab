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
    Clubs: 1,
    Diamonds: 2,
    Hearts: 3,
    Spades: 4
});
Card.Rank = enumeration({
    Two: 2,
    Three: 3,
    Four: 4,
    Five: 5,
    Six: 6,
    Seven: 7,
    Eight: 8,
    Nine: 9,
    Ten: 10,
    Jack: 11,
    Queen: 12,
    King: 13,
    Ace: 14
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

var deck = (new Deck()).shuffle()
var hand1 = deck.deal(2).sort(Card.orderBySuit);
var hand2 = deck.deal(2).sort(Card.orderBySuit);

console.log("Hand 1:", hand1.toString());
console.log("Hand 2:", hand2.toString());
