print 'testing all samples... \n'

import pickle
from my_functions import read_from_file
import numpy as np
import matplotlib.pyplot as plt

samples = read_from_file('./samples.txt')
training = read_from_file('./training.txt')

filehandler = open('model','r')
model = pickle.load(filehandler)
filehandler.close()

y_pred = model.predict(samples['rss'])

'''
plt.figure(1)
plt.plot(training['rss'])
plt.title('training rss')

plt.figure(2)
plt.plot(samples['rss'])
plt.title('samples rss')
plt.show()
'''

print float ((y_pred == np.array(samples['label'])).sum())/y_pred.size


