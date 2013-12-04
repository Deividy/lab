run = (fn, a, b) -> fn.apply(@, [a, b])

f = (a, b) -> console.log a, b

run f, 10, 20

# f (g) h => f((g), h)

foo = {
    x: 1 # scope for bar
    bar: { # scope for baz
        baz: () -> @x
    }
    fo: () -> @x
}

console.log foo.bar.baz()           # => undefined
console.log foo.fo()                # => 1
console.log @foo                    # => undefined

xInContext = () -> console.log @x
what = { x: 'quantum entaglement' }

xInContext.apply(what)


x = true
showAnswear = (x = x) ->
    console.log x                  # => undefined
    console.log if x then 'It works!' else 'No!'

showAnswear()                     # => No!
console.log x                     # => true

