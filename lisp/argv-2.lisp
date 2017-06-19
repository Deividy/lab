
(print "What is your name?")
(print "> ")
(print (string-concat "Hello, " (read-line)))

(print "Do you like coffee? (y/n)")
(print "> ")
(print (if (string-equal "y" (read-char))
         "cool, me too"
         "ok then"))

(print "I can sum!")
(print "> ")
(print (apply '+ (read)))
