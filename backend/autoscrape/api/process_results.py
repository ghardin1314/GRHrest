
import requests
import json
import numpy as np
import pandas as pd
import math
import scipy.linalg
from scipy.spatial import ConvexHull

class processResults():
    def __init__(self, listings):
        self.value = []
        self.data = []
        self.listings = listings
        self.verticies = []
        self.BestBuy = []

    def run_analysis(self):

        self._populateValue()

        self.value.sort()

        data1 = self.value
        df = pd.DataFrame(data1, columns=['Year', 'Miles', 'Price'])
        x = np.array(df['Year'])
        y = np.array(df['Miles'])
        z = np.array(df['Price'])
        self.data = np.c_[x, y, z]

        self._get_verticies()
        self._get_bestbuy()

        return self.BestBuy

    def _populateValue(self):
        'extracts just value data from api call'

        for listing in self.listings:

            year = listing['year']
            miles = listing['miles']
            price = listing['price']
            self.value.append([year, miles, price])

    def _get_verticies(self):
        """
        Gets the verticies of the convex hull that incapsulates Price-Miles 
        space of results. Appends verticies to self.verticies
        """
        
        years = list(set(self.data[:, 0]))
        years.sort()
    
        dataRange = []
        for year in years:
            temp = np.where(self.data[:, 0] == year)
            maxI = max(temp[0])
            minI = min(temp[0])
            maxMiles = max(self.data[minI:maxI+1, 1])
            minMiles = min(self.data[minI:maxI+1, 1])
            maxPrice = max(self.data[minI:maxI+1, 2])
            minPrice = min(self.data[minI:maxI+1, 2])
            ranges = [year, maxMiles, minMiles, maxPrice, minPrice]
            dataRange.append(ranges)
    
        dataRange = pd.DataFrame(dataRange, columns=['Year',
                                                     'MaxMiles', 'MinMiles',
                                                     'MaxPrice', 'MinPrice'])
        points = []
    
        for i, year in enumerate(dataRange['Year']):
            points.append([year, dataRange['MaxMiles'][i]])
            points.append([year, dataRange['MinMiles'][i]])
    
        points = np.array(points)
    
        hull = ConvexHull(points)
        vertex_ind = hull.vertices
        vertex_ind = np.append(vertex_ind, vertex_ind[0])
        self.verticies = points[vertex_ind, :]

    def _get_bestbuy(self):
        """
        Takes Year, Miles, Price data and create a cubic surface to approximate
        results. Then finds minimum curvature of the surface inside of the
        Year-Miles domain range. This is the place where depreciation is 
        decelerating the most and therefore the optimal place to buy a car.
        Appends best Year and Miles to self.BestBuy
        Returns
        """
        mn = np.min(self.data, axis=0)
        mx = np.max(self.data, axis=0)
        
        X, Y = np.meshgrid(np.linspace(mn[0], mx[0], 100), np.linspace(mn[1],
                           mx[1], 100))
        XX = X.flatten()
        YY = Y.flatten()
    
        A1 = np.ones(self.data.shape[0])
        A2 = self.data[:, :2]
        A3 = np.prod(self.data[:, :2], axis=1)
        A4 = self.data[:, :2]**2
        A5 = self.data[:, 0]**2*self.data[:, 1]
        A6 = self.data[:, 1]**2*self.data[:, 0]
        A7 = self.data[:, :2]**3

        A = np.c_[A1, A2, A3, A4, A5, A6, A7]


        C, _, _, _ = scipy.linalg.lstsq(A, self.data[:, 2])
    
        Z = np.dot(np.c_[np.ones(XX.shape), XX, YY, XX*YY, XX**2, YY**2, XX**2*YY,
                         YY**2*XX, XX**3, YY**3], C).reshape(X.shape)

        H = self._mean_curvature(Z)

        H_flat = [item for sublist in H for item in sublist]
        H_flat.sort()

        for value in H_flat:

            index = np.where(H == value)
            xmin = int(X[index[0], index[1]])
            ymin = int(Y[index[0], index[1]])

            if self._inside(self.verticies, xmin, ymin):
                xmin = round(xmin)
                ymin = round(ymin/1000)*1000
                self.BestBuy = [xmin, ymin]
                break

    def _mean_curvature(self, Z):
        """
        Finds the mean curvature of a square matrix Z
        """
        Zy, Zx = np.gradient(Z)
        Zxy, Zxx = np.gradient(Zx)
        Zyy, _ = np.gradient(Zy)
    
        H = (Zx**2 + 1)*Zyy - 2*Zx*Zy*Zxy + (Zy**2 + 1)*Zxx
        H = -H/(2*(Zx**2 + Zy**2 + 1)**(1.5))
    
        return H
    
    def _inside(self, verticies, x, y):
        """
        Tests if point (x,y) is located in a shape that has verticies
        """
        inside = True
        for i in range(1, len(verticies)):
            res = self._cross(verticies[i-1], verticies[i], (x, y))
    
            if res < 0:
                inside = False
                break
    
        return inside
    
    def _cross(self, o, a, b):
        """ 2D cross product of OA and OB vectors,
         i.e. z-component of their 3D cross product.
        :param o: point O
        :param a: point A
        :param b: point B
        :return cross product of vectors OA and OB (OA x OB),
         positive if OAB makes a counter-clockwise turn,
         negative for clockwise turn, and zero
         if the points are colinear.
        """
    
        res = (a[0] - o[0]) * (b[1] - o[1]) -\
              (a[1] - o[1]) * (b[0] - o[0])
    
        return res

if __name__ == '__main__':
        
    payload = {
        "carmake_pk": '',
        "carmodel_pk": '',
        "cartrim_pk": 115,
      }


    res = requests.get("http://localhost:8000/api/autoscrape/results/", params = payload)
    results = res.json()

    test = processResults(results)
    
    ans = test.run_analysis()

    pass