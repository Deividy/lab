(setf *random-state* (make-random-state t))

(defparameter *simple-grammar*
  '((sentence (noun-phrase verb-phrase))
    (noun-phrase (Article Noun))
    (verb-phrase (Verb noun-phrase))
    (Article the a)
    (Noun man ball woman table)
    (Verb hit took saw liked))
  "A grammar for a trivial subset of english.")

(defvar *grammar* *simple-grammar*
  "At the begginig this is simple-grammar, but we are free to change that.")

(defun mappend (fn the-list)
  "Call fn in each value of the list appending results."
  (if (null the-list)
    nil
    (append (funcall fn (first the-list))
            (mappend fn (rest the-list)))))

(defun random-elt (choices)
  "Get a random element from choices"
  (elt choices (random (length choices))))

(defun rule-lhs (rule)
  "Get the left hand of an expression"
  (first rule))

(defun rule-rhs (rule)
  "Gets the right hand of an expression"
  (rest rule))

(defun rewrites (category)
  "Return a list of the possible rewrites for this category."
  (rule-rhs (assoc category *grammar*)))

(defun is-not-terminal-choices (choices)
  "Returns true if choices is not terminal"
  (not (null choices)))

(defun generate (phrase)
  "Generate a random sentence or phrase"
  (let ((choices (rewrites phrase)))
    (cond ((listp phrase)
           (mappend #'generate phrase))
          ((is-not-terminal-choices choices)
           (generate (random-elt choices)))
          (t (list phrase)))))

(defun generate-tree (phrase)
  "Generate a random sentence or phrase, with a complete parse tree."
  (cond ((listp phrase)
         (mapcar #'generate-tree phrase))
        ((rewrites phrase)
         (cons phrase
               (generate-tree (random-elt (rewrites phrase)))))
        (t (list phrase))))

(defun generate-all (phrase)
  "Generate a list of all possible expansions of this phrase"
  (cond ((null phrase) (list nil))
        ((listp phrase)
         (combine-all (generate-all (first phrase))
                      (generate-all (rest phrase))))
        ((rewrites phrase)
         (mappend #'generate-all (rewrites phrase)))
        (t (list (list phrase)))))

(defun cross-product (fn xlist ylist)
  "Return a list of all (fn x y) values"
  (mappend #'(lambda (y)
               (mapcar #'(lambda (x) (funcall fn x y)) xlist))
           ylist))

(defun combine-all (xlist ylist)
  "Return a list of lists formed by append a y to an x
  e.g: (combine-all '((a) (b)) '((1) (2))) -> ((A 1) (B 1) (A 2) (B 2))"
  (cross-product #'append xlist ylist))

(trace generate generate-tree)
(print (generate 'sentence))
(print (generate-tree 'sentence))

(print (generate-all 'Article))
(print (generate-all 'Noun))
(print (generate-all 'noun-phrase))
(print (length (generate-all 'sentence)))

(print (- (length (assoc 'Article *grammar*)) 1))
(print (- (length (assoc 'Noun *grammar*)) 1))
(print (- (length (assoc 'Verb *grammar*)) 1))

(print (* (- (length (assoc 'Article *grammar*)) 1)
          (- (length (assoc 'Noun *grammar*)) 1)
          (- (length (assoc 'Verb *grammar*)) 1)
          2 4)) ; 2 4 are noun-phrase verb-phrase

(print (cross-product (lambda (a b)
                        (string-concat (string a) (string b)))
                      '(foo) '(bar)))

