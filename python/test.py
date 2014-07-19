#!/usr/bin/python2.7 -tt
import sys

class Person:
    """Person class"""

    def __init__(self, value):
        self.name = value
        print "Person, " + self.name + " initialized"

    def walk(self, steps):
        self.lastSteps = steps
        print self.name + " walked " + str(steps) + " steps"

    def update(self):
        self.__update("last steps " + str(self.lastSteps))

    def __update(self, values):
        print self.name + " update " + values

class Programmer(Person):
    def __init__(self, value):
        self.name = "Programmer " + value
        print "Programmer, " + value + " initialized"

    def writeCode(self):
        self.__writeCode("x++ " + self.lastSteps)

    def __writeCode(self, values):
        print self.name + ", wrotes a code " + values

deividy = Programmer(sys.argv[1])
deividy.walk(sys.argv[2])

deividy.update()
deividy.writeCode()
