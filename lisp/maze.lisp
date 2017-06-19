(load "gps.lisp")

(defun make-maze-ops (pair)
  "Make maze operators in both directions"
  (list (make-maze-op (first pair) (second pair))
        (make-maze-op (second pair) (first pair))))

(defun make-maze-op (here there)
  "Make an operator to move between two places"
  (op `(move from ,here to ,there)
      :preconds `((at ,here))
      :add-list `((at ,there))
      :del-list `((at ,here))))

(defun mappend (fn the-list)
  "Call fn in each value of the list append results"
  (if (null the-list)
    nil
    (append (funcall fn (first the-list))
            (mappend fn (rest the-list)))))

(setf (symbol-function 'find-all-if) #'remove-if-not)

(defun action-p (x)
  "Is x something that is (start) or (executing ...)?"
  (or (equal x '(start)) (executing-p x)))

(defun gps (state goals &optional (*ops* *ops*))
  "GPS!"
  (find-all-if #'action-p
               (achieve-all (cons '(start) state) goals nil)))

(defun appropriate-ops (goal state)
  "Return list of appropriate operators"
  (sort (copy-list (find-all goal *ops* :test #'appropriate-p))
        :key #'(lambda (op)
                 (count-if #'(lambda (precond)
                               (not (member-equal precond state)))
                           (op-preconds op)))))


(defparameter *maze-ops*
  (mappend #'make-maze-ops
    '((1 2) (2 3) (3 4) (4 9) (9 14) (9 8) (8 7) (7 12) (12 13)
        (12 11) (11 6) (11 16) (16 17) (17 22) (21 22) (22 23)
        (23 18) (23 24) (24 19) (19 20) (20 15) (15 10) (10 5) (20 25))))

(print (use *maze-ops*))
(print-gps (gps '((at 1)) '((at 25))))
