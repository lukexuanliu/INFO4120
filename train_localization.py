print 'training... '

import pickle
from sklearn.naive_bayes import GaussianNB
from my_functions import read_from_file
import numpy as np

results = read_from_file('./training.txt')

gnb = GaussianNB()

unique_label = np.unique(results['label'])
'''
a = results['rss']
print a
print results['label']

row, col = np.array(a).shape
print row
print col

r = np.zeros((row, col))
for k, y_k in enumerate(unique_label):
    r[k,:] = [a[i] for i, x in enumerate(results['label']) if x == y_k]
print r


data = smoothListGaussian(results['rss'].tolist())
'''

model = gnb.fit(results['rss'], results['label'])

filehandler = open('model', 'w')
pickle.dump(model, filehandler)
filehandler.close()

print 'done!'


def smoothListGaussian(list, strippedXs=False, degree=5):  

     window=degree*2-1  

     weight=numpy.array([1.0]*window)  

     weightGauss=[]  

     for i in range(window):  

         i=i-degree+1  

         frac=i/float(window)  

         gauss=1/(numpy.exp((4*(frac))**2))  

         weightGauss.append(gauss)  

     weight=numpy.array(weightGauss)*weight  

     smoothed=[0.0]*(len(list)-window)  

     for i in range(len(smoothed)):  

         smoothed[i]=sum(numpy.array(list[i:i+window])*weight)/sum(weight)  

     return smoothed  

