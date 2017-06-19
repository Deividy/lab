#!/usr/local/bin/clisp

(defun handle-arg (x)
  "handles an arg from command line"
  (if (string-equal "foo" x)
    (print "nois")
    (print (string-concat "fail: " x))))

(mapcar #'handle-arg *args*)
