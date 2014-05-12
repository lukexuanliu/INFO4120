print 'training... '

import pickle
from sklearn.naive_bayes import GaussianNB
from my_functions import read_from_file

results = read_from_file('./training.txt')

gnb = GaussianNB()
model = gnb.fit(results['rss'], results['label'])

filehandler = open('model', 'w')
pickle.dump(model, filehandler)
filehandler.close()

print 'done!'

