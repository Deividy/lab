(defun math-crazy (alist blist)
  "Math crazy"
  (mapcar #'(lambda (x y)
              (reduce #'(lambda (x y) (+ x y))
                      (mapcar #'(lambda (z n)
                                  (- (* z z) (+ n n)))
                              (list (- y 2)  (* y x) '4)
                              (list (- x 2) (- y x) '2))))
          alist blist))

(print (math-crazy '(1 2 3 4 5 6) '(6 2 2 2 1 1)))

(defun l-test (list)
  (if (null list)
    0
    (+ 1 (l-test (rest list))))) ; less efficient recursive calls

(defun l-test2 (list &optional (len-so-far 0))
  (if (null list)
    len-so-far
    (l-test2 (rest list) (+ 1 len-so-far)))) ; better way to call recursive

(print (l-test '(1 2 3 4))) 
(print (l-test2 '(1 2 3 4))) 

(print `(foo bar))
(setq foo '(fut ball))
(print `(foo ,foo))
(print `(foo ,@foo))
(print `(foo . ,foo))
(print `(foo ,foo))
