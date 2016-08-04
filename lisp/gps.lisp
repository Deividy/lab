(defvar *state* nil "current state")
(defvar *ops* nil "list of available operators")

; may find a more appropriated name? this is not the find-all of
; example book anymore
(defun find-all (item sequence &key (test #'eql))
  (remove item sequence :test (complement test)))

(defstruct op "operation"
  (action nil) (preconds nil) (add-list nil) (del-list nil))

(defun gps (*state* goals *ops*)
  "general problem solver"
  (if (every #'achieve goals) 'solved))

(defun achieve (goal)
  "A goal is achieved if it already holds, or if there is an appropriate
  op for it that is applicable"
  (or (member goal *state*)
      (some #'apply-op
            (find-all goal *ops* :test #'appropriate-p))))

(defun appropriate-p (goal op)
  "is operation appropriate?"
  (member goal (op-add-list op)))

(defun apply-op (op)
  "print a message and update *state*"
  (when (every #'achieve (op-preconds op))
    (print (list 'executing (op-action op)))
    (setf *state* (set-difference *state* (op-del-list op)))
    (setf *state* (union *state* (op-add-list op)))
    t))

; testing this gps!

(defparameter *smoking-ops*
  (list
    (make-op :action 'smoke-weed
             :preconds '(have-lighter have-weed)
             :add-list '(stoned)
             :del-list '(have-weed))

    (make-op :action 'buy-weed
             :preconds '(have-money)
             :add-list '(have-weed)
             :del-list '(have-money))

    (make-op :action 'buy-lighter
             :preconds '(have-money)
             :add-list '(have-lighter)
             :del-list '(have-money))

    (make-op :action 'work
             :preconds '(have-will)
             :add-list '(have-money))))

(print (gps '(have-will) '(stoned) *smoking-ops*))
