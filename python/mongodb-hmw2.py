#!/usr/bin/python2.7 -tt
import sys, re

# custom args
mongostat = 'mongostat.log'

debug = bool(0)
if len(sys.argv) > 1:
    debug = bool(int(sys.argv[1]))

startLine = 1000 # each line is 1 sec
maxSeconds = (60 * 60) # 1 hour

# initialize file and split by line
mongostatFile = open(mongostat, 'r')
mongostatContent = mongostatFile.read()
mongostatLines = mongostatContent.split("\n")

# initialize vars
totals = { 'inserts': 0, 'queries': 0, 'updates': 0, 'deletes': 0 }
times = { 'start': '', 'end': '' }
count = 0

# function definitions
def lineArgToNumber(arg):
    try:
        return float(re.sub("[\s\*]", '', str(arg)))
    except ValueError:
        return 0
     
def getLineValuesByLineArgs(lineArgs):
    inserts = lineArgToNumber(lineArgs[2])
    queries = lineArgToNumber(lineArgs[4])
    updates = lineArgToNumber(lineArgs[6])
    deletes = lineArgToNumber(lineArgs[8])
    time = lineArgs[len(lineArgs) -1]

    d = { 
       'inserts': inserts, 
       'queries': queries,
       'updates': updates,
       'deletes': deletes,
       'time': time
    }
    
    return d

def sumWithTotals(values):
    for k in totals:
        totals[k] += values[k]

def printTotal(key):
    return str(round(totals[key] / count, 2))

def printLineValues(lineValues):
    print 'Time: ' + lineValues['time']
    print 'Inserts: ' + str(int(lineValues['inserts'])) 
    print 'Queries: ' + str(int(lineValues['queries']))
    print 'Updates: ' + str(int(lineValues['updates']))
    print 'Deletes: ' + str(int(lineValues['deletes']))
    #print lineArgs
    print '  '

# loop all lines in file starting by startLine
for line in mongostatLines[startLine:]:
    if count >= maxSeconds:
        break

    lineArgs = line.split("  ")
    if lineArgs < 10 or lineArgs[0] == 'insert':
        continue

    lineValues = getLineValuesByLineArgs(lineArgs)

    if count == 0:
        times['start'] = lineValues['time']

    sumWithTotals(lineValues)

    times['end'] = lineValues['time']
    count += 1
    
    if debug:
        printLineValues(lineValues)

# print results
print " "
print "Start Time: " + times['start']
print "End Time: " + times['end'] 
print "---- ---- "
print "Inserts per second: " + printTotal('inserts')
print "Queries per second: " + printTotal('queries')
print "Updates per second: " + printTotal('updates')
print "Deletes per second: " + printTotal('deletes')
print "---- ---- "
print " "
