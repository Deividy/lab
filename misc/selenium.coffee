soda = require('soda')
jsdom = require("jsdom")

browser = soda.createClient({
    host: 'dlogix'
    port: 4444
    url: 'http://www.vindecoder.net/'
    browser: 'iehta'
})

browser.on('command', (cmd, args) ->
    console.log ' \x1b[33m%s\x1b[0m: %s', cmd, args.join(', ')
)

browser
    .chain
    .session()
    .open('/')
    .type('vin', '2G2WP522651173085')
    .click('submit')
    .waitForPageToLoad(10000)
    .getHtmlSource((body) ->
        jsdom.env(body, ["http://code.jquery.com/jquery.js"], (err, w) ->
            vehicle = { }
            w.$("#oPreVinData .even, #oPreVinData .odd").each((i, e) ->
                k = w.$(e).find('strong').text()
                vehicle[k] = w.$(e).text().replace(k, '')
            )
            console.log vehicle
        )
    )
    .end((err) ->
        browser.testComplete(() ->
            throw err if (err)
        )
    )

