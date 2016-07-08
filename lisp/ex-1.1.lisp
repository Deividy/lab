(defparameter *last-name-suffix*
  '(Jr #\, Junior)
  "Define a list of last name suffix such as , Jr, Junior...")

(defparameter *ponctuations*
  '(#\, #\.)
  "A list of ponctuations")

(defun mappend (fn the-list)
  "Call fn in each value of the list append results"
  (if (null the-list)
    nil
    (append (funcall fn (first the-list))
            (mappend fn (rest the-list)))))

(defun cross-product (fn xlist ylist)
  "Return a list of all (fn x y)"
  (mappend #'(lambda (y)
               (mapcar #'(lambda (x) (funcall fn x y)) xlist))
           ylist))

(defun concat-str-lists (alist blist)
  "Concat two list of strings, as result: ((a b) (c d)) => ((ac bc) (bc bd))"
  (cross-product #'(lambda (astr bstr)
                     (string-concat (string astr) (string bstr)))
                 alist blist))

(defparameter *last-name-sufix-with-ponctuations*
  (concat-str-lists *last-name-suffix* *ponctuations*)
  "Define a list of last-name-suffix + ponctuations")

(defun is-valid-last-name (name)
  "Given a name, return 1 or NIL if is a valid last name"
    (unless (or
              (is-string-member name *last-name-suffix*)
              (is-string-member name *last-name-sufix-with-ponctuations*))
      t))

(defun is-string-member (value str-list)
  "Check if value is member of a list of strings"
  (loop for str in str-list do
        (if (string-equal (string-downcase str) (string-downcase value))
          (return t) nil)))

(defun remove-last-ponctuation (value)
  "Remove last ponctuation of a value string"
  (if (is-string-member (substring value (- (length value) 1)) *ponctuations*)
    (substring value 0 (- (length value) 1))
    value))

(defun to-name (value)
  "Caps value to Name captalization"
  (string-concat
    (string-upcase (substring value 0 1))
    (string-downcase (substring value 1 (length value)))))

(defun last-name (name)
  "Gets the last name"
  (if (is-valid-last-name (first (last name)))
    (remove-last-ponctuation (string (first (last name))))
    (last-name (reverse (rest (reverse name))))))

(defun find-space-pos (str start-idx)
  "Find the position of next space"
  (position #\Space str :start start-idx))

(defun split-by-one-space (str)
  "Split a string by one space and a return a list of it"
  (loop for i = 0 then (+ j 1)
        as j = (position #\Space str :start i)
        until (null j)
        collect (substring str i j)))
;
;  (do ((i 0 pos)
;        (pos (find-space-pos str 0) (find-space-pos str (+ i 1)))
;        (ret '() (push (substring str i pos) ret)))
;    ((null pos) ret)))


(trace
  last-name to-name remove-last-ponctuation split-by-one-space
  is-string-member is-valid-last-name string-upcase
  string-downcase substring string-concat first last rest reverse string
  loop)

(print (last-name '(Deividy Metheler)))
(print (last-name '(Deividy Metheler Jr)))
(print (last-name '(Deividy Metheler Jr Junior Jr)))
(print (last-name '(Deividy Metheler Zachetti Jr Junior #\, Jr)))

(print (to-name (last-name (split-by-one-space "Foo deividy ,"))))
(print (to-name (last-name (split-by-one-space "Mr, Metheler, Junior , Jr"))))
(print (to-name (last-name (split-by-one-space "Zachetti, , JUNIOR, JR,"))))
