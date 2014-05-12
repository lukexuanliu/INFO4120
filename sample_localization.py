print 'sampling... \n'

import pickle
from my_functions import read_from_file

results = read_from_file('./sample.txt')

filehandler = open('model','r')
model = pickle.load(filehandler)
filehandler.close()

y_pred = model.predict(results['rss'])

print y_pred[0]

