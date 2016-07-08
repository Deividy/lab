(defstruct game
  :home-team :away-team :goals-home :goals-away)

; just a shortcut
(defun compute-game (ht at &optional (gh nil) (ga nil))
  "Compute a game"
  (make-game :home-team ht :away-team at :goals-home gh :goals-away ga))

(setq *rodadas*
      (list
        ; 1 rodada
        (list
          (compute-game 'fla 'spo 1 0)
          (compute-game 'pal 'cap 4 0)
          (compute-game 'cam 'san 1 0)
          (compute-game 'cfc 'cru 1 0)
          (compute-game 'bot 'sao 0 1)
          (compute-game 'sta 'vit 4 1)
          (compute-game 'cor 'gre 0 0)
          (compute-game 'fig 'pon 0 0)
          (compute-game 'ame 'flu 0 1)
          (compute-game 'int 'cha 0 0))

        ; 2 rodada
        (list
          (compute-game 'pon 'pal 2 1)
          (compute-game 'flu 'sta 2 2)
          (compute-game 'cru 'fig 2 2)
          (compute-game 'san 'cfc 2 1)
          (compute-game 'cap 'cam 1 1)
          (compute-game 'vit 'cor 3 2)
          (compute-game 'sao 'int 1 2)
          (compute-game 'gre 'fla 1 0)
          (compute-game 'cha 'ame 3 1)
          (compute-game 'spo 'bot 1 1))

        ; 3 rodada
        (list
          (compute-game 'bot 'cap 2 1)
          (compute-game 'fig 'san 2 2)
          (compute-game 'fla 'cha 2 2)
          (compute-game 'ame 'vit 1 1)
          (compute-game 'pal 'flu 2 0)
          (compute-game 'cfc 'sao 1 1)
          (compute-game 'sta 'cru 4 1)
          (compute-game 'cor 'pon 3 0)
          (compute-game 'int 'spo 1 0)
          (compute-game 'cam 'gre 1 1))

        ; 4 rodada
        (list
          (compute-game 'cru 'ame 1 1)
          (compute-game 'cap 'fig 2 1)
          (compute-game 'cha 'sta 1 1)
          (compute-game 'pon 'fla 1 2)
          (compute-game 'spo 'cor 0 2)
          (compute-game 'vit 'cam 1 1)
          (compute-game 'flu 'bot 1 0)
          (compute-game 'sao 'pal 1 0)
          (compute-game 'san 'int 0 1)
          (compute-game 'gre 'cfc 1 1))

        ; 5 rodada
        (list
          (compute-game 'int 'cap 1 0)
          (compute-game 'cor 'san 1 0)
          (compute-game 'cfc 'cha 3 4)
          (compute-game 'sta 'spo 0 1)
          (compute-game 'bot 'cru 0 1)
          (compute-game 'fig 'sao 1 0)
          (compute-game 'ame 'pon 1 2)
          (compute-game 'fla 'vit 1 0)
          (compute-game 'pal 'gre 4 3)
          (compute-game 'cam 'flu 1 1))

        ; 6 rodada
        (list
          (compute-game 'cap 'sta)
          (compute-game 'cor 'cfc)
          (compute-game 'cha 'flu)
          (compute-game 'san 'bot)
          (compute-game 'ame 'fig)
          (compute-game 'vit 'int)
          (compute-game 'fla 'pal)
          (compute-game 'spo 'cam)
          (compute-game 'gre 'pon)
          (compute-game 'cru 'sao))
      ))

(defun print-game (g)
  "Prints a game"
  (print (format nil "~s ~d vs ~s ~d"
                 (game-home-team g)
                 (game-goals-home g)
                 (game-away-team g)
                 (game-goals-away g))))

(defun print-rodadas (&optional (current-rodada 1))
  "Print rodadas"
  (let ((rodada (nth (- current-rodada 1) *rodadas*)))
    (print current-rodada)
    (mapcar #'print-game rodada)
    (unless (null rodada)
      (print-rodadas (+ current-rodada 1)))))

(print-rodadas)
