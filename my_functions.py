"""
read from text file containing wifi signal data
"""
def read_from_file(fileDir):
	with open(fileDir) as f:
		data = f.readlines()

		rss = []
		label = []
	
		for line in data:
			nums = line.split(',')
			if nums:
				nums = [float(i) for i in nums]
                if nums[-1] >= 0: #only if the label is valid
				    rss.append(nums[0:-1])
				    label.append(nums[-1])
	return {'rss':rss, 'label':label}



"""
euclidean distance classifer
"""
import numpy as np
class MyClassifier:
    def fit(self, X, y):
        n_samples, n_features = np.array(X).shape

        self.classes_ = unique_y = np.unique(y)
        n_classes = unique_y.shape[0]

        m = np.zeros((n_classes, n_features))
        ct = np.zeros(n_classes)

        for i in range(n_samples):
            for j in range(n_classes):
                m[y[i]-1,j] = m[y[i]-1,j] + X[i][j]

        for i in range(n_samples):
            ct[y[i]-1] = ct[y[i]-1] + 1
        
        for j in range(n_classes):        
            m[j,:] = m[j,:]/ct[j]
        return m

    def predict(self, m, X):
        n_samples, n_features = np.array(X).shape
        ypred = np.zeros(n_samples)
        n_classes = m.shape[0]
        dist = np.zeros(n_classes)
        for i in range(n_samples):
            for j in range(n_classes):
                dist[j] = ((m[j] - X[i])**2).sum()

            ypred[i] = dist.argmin(axis=0)
        return ypred  

