(defun last-name (name)
  "Gets the last name from a list"
  (first (last name)))

(setf names '(
              (Deividy Metheler Zachetti)
              (Ana Carolina de Lima Souza)
              (Mr Deividy)
              (Sr Speedy)))

(defun first-name (name)
  "Gets the first name from a list."
  (first name))

(print (first-name (first names)))
(print (first-name (third names)))

(print (mapcar #'first-name names))

(defparameter *name-titles*
  '(Mr Mrs Sr Srs)
  "A list of name titles.")

(defun first-name (name)
  "Gets the first name from a list removing the name title."
  (if (member (first name) *name-titles*)
    (first-name (rest name))
    (first name)))

(trace first-name)

(print (mapcar #'first-name names))
(print (documentation 'first-name 'function))

(untrace first-name)

(print '(Hey dude))

(defun mappend (fn the-list)
  "Apply fn to each element of list and append the results." ; as book said
  (apply #'append (mapcar fn the-list)))

(print (apply #'+ '(4 2 0)))

(print (apply #'append '((4 2 0) (f o o))))

(defun self-and-double (x) (list x (* x 2)))
(print (self-and-double 4))

(print (apply #'self-and-double '(3)))

(print (mapcar #'self-and-double '(2 20 400)))
(print (mappend #'self-and-double '(2 20 400)))

(defun numbers-and-negations (input)
  "Given a list, return only the numbers and their negations. (two-face!)"
  (mappend #'number-and-negation-one input))

(defun number-and-negation-one (x)
  "If x is a number, return a list of x and -x."
  (if (numberp x)
    (list x (- x))
    nil))

(print (numbers-and-negations '(testing 4 2 0 test man)))

(defun mappend (fn the-list)
  "Apply fn to each... element.... :)"
  (if (null the-list)
    nil
    (append (funcall fn (first the-list))
            (mappend fn (rest the-list)))))

(print (mappend #'self-and-double '(2 20 400)))

(print (funcall #'+ 2 3 5 4 2))
(print (apply #'+ '(2 3 5 4 2)))
;(print (funcall #'+ '(2 3 5 4 2)))

(print ((lambda (x y) (+ x 2 y)) 4 2))
(print (funcall #'(lambda (x y) (+ x 2 y)) 4 2))


