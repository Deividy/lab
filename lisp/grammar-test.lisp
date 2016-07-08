(setf *random-state* (make-random-state t))

(defun sentence () (append (noun-phrase) (verb-phrase)))
(defun noun-phrase () (append (Article) (Noun)))
(defun verb-phrase () (append (Verb) (noun-phrase)))
(defun Article () (one-of '(the a)))
(defun Noun () (one-of '(man ball woman table car bike)))
(defun Verb () (one-of '(hit took saw liked watched kicked)))

(defun one-of (set)
  "Pick one el of a set, and make a list of it."
  (list (random-elt set)))

(defun random-elt (choices)
  "Choose an element from a list at random."
  (elt choices (random (length choices))))

(print (sentence))
(print (sentence))
(print (sentence))
(print (sentence))
(print (noun-phrase))
(print (verb-phrase))

(trace sentence noun-phrase verb-phrase Article Verb)

(print (sentence))

(defun r ()
  "Return a random t or nil"
  (random-elt '(t nil)))

(defun Adj* ()
  (when (r)
    (append (Adj) (Adj*))))

(defun PP* ()
  (when (r)
    (append (PP) (PP*))))

(defun noun-phrase () (append (Article) (Adj*) (Noun) (PP*)))
(defun PP () (append (Prep) (noun-phrase)))
(defun Adj () (one-of '(big little blue  green red adiabatic)))
(defun Prep () (one-of '(to in by with on)))

(print (noun-phrase))
(print (noun-phrase))
(print (noun-phrase))
