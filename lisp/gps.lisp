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


; === new version!

(defun gps (state goals *ops*)
  "GPS: General Problem Solver"
  (remove-if #'atom (achieve-all (cons '(start) state) goals nil)))

(defun executing-p (action)
  "is action of the form: (executing ...)?"
  (starts-with action 'executing))

(defun starts-with (list val)
  "is this a list whose first element is the val?"
  (and (consp list) (eql (first list) val)))

(defun convert-op (op)
  "convert an operation action to the (executing op) convetion"
  (unless (some #'executing-p (op-add-list op))
    (push (list 'executing (op-action op)) (op-add-list op)))
  op)

(defun op (action &key preconds add-list del-list)
  "helper to make a new operator with the (executing op) convetion for action"
  (convert-op
    (make-op :action action :preconds preconds
             :add-list add-list :del-list del-list)))

(defun achieve-all (state goals goal-stack)
  "achieve each goal, and make sure they still hold at the end"
  (let ((current-state state))
    (if (and (every #'(lambda (g)
                        (setf current-state
                              (achieve current-state g goal-stack)))
                    goals)
             (subsetp goals current-state :test #'equal))
      current-state)))

(defun achieve (state goal goal-stack)
  "a goal is achieved when it arrives to its destine :)"
  (cond ((member-equal goal state) state)
        ((member-equal goal goal-stack) nil)
        (t (some #'(lambda (op) (apply-op state goal op goal-stack))
                 (find-all goal *ops* :test #'appropriate-p)))))

(defun appropriate-p (goal op)
  "an op is appropriate to a goal if it is in its add-list"
  (member-equal goal (op-add-list op)))

(defun member-equal (item list)
  (member item list :test #'equal))


(defun apply-op (state goal op goal-stack)
  "return a new, transformed state if op is applicable"
  (let ((state2 (achieve-all state (op-preconds op)
                             (cons goal goal-stack))))
    (unless (null state2)
      ;; return an updated state
      (append (remove-if #'(lambda (s)
                             (member-equal s (op-del-list op)))
                         state2)
              (op-add-list op)))))


(mapc #'convert-op *smoking-ops*)

(print (gps '(have-will) '(stoned) *smoking-ops*))
