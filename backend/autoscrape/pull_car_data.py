import requests
import threading
import concurrent.futures
import math
import re
import json

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')
django.setup()


from autoscrape.models import CarMake, CarModel, CarTrim

class search_res:
    def __init__(self):
        self.value = []
        self.data = []
        self.listings = []
        self.verticies = []
        self.BestBuy = []
        self._lock = threading.Lock()
        
    def run_search(self, make_code, model_code, trim_code = []):
        
        self._get_results(make_code, model_code, trim_code)

        self._get_data()

        print('{} {} has {} listings'.format(trim_code, model_code, len(self.value)))

        pass

    def _get_results(self, make_code, model_code, trim_code):

        """

        Parameters
        ----------
        make_code : STR, optional
            Internal make code. The default is [].
        model_code : STR, optional
            Internal model code. The default is [].
        trim_code : STR, optional
            Internal trim code. The default is [].

        Returns
        -------
        Pulls results from Autotrader.com. Max results are 1000. Pulls each 
        page individually and then appends each listing to self.listings

        """
        
        res = self._get_page(make_code=make_code, model_code=model_code,
                            trim_code=trim_code)

        try:
            numResults = res['totalResultCount']
        except:
            return

        if numResults > 1000:
            pages = 10
        else:
            pages = math.ceil(numResults/100)

        with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
            for i in range(1, pages):
                executor.submit(self._get_page(make_code=make_code,
                                              model_code=model_code,
                                              trim_code=trim_code, page=i))

    def _get_page(self, make_code=[], model_code=[], trim_code=[],
                 page=0):
        """

        Parameters
        ----------
        make_code : STR, optional
            Internal make code. The default is [].
        model_code : STR, optional
            Internal model code. The default is [].
        trim_code : STR, optional
            Internal trim code. The default is [].
        page : int, optional
            What page of results you want to pull. The default is 0.

        Returns
        -------
        results : JSON
            JSON page of results. Also pulls listings from page data and 
            appends to self.listings.

        """

        firstRecord = str(page*100)

        url_base = 'https://www.autotrader.com'
        path = '/rest/searchresults/base'
        url = url_base + path
        session = requests.Session()
        payload = {'makeCodeList': make_code,
                   'searchRadius': '0',
                   'listingTypes': 'USED',
                   'modelCodeList': model_code,
                   'trimCodeList': trim_code,
                   'zip': '90250',
                   'startYear': '2010',
                   'sortBy': 'distanceASC',
                   'numRecords': '100',
                   'firstRecord': firstRecord,
                   }
        headers= {'User-Agent': """Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36"""}
        response = session.get(url, headers=headers, params=payload)
        results = response.json()
        self._pull_listings(results)
        return results

    def _pull_listings(self, results):
        """

        Parameters
        ----------
        results : JSON
            JSON of Autotrader API response.

        Returns
        -------
        None. Appends each listing to self.listings

        """
        try:
            page_listings = results['listings']
            with self._lock:
                for item in page_listings:
                    self.listings.append(item)
        except:
            pass

    def _get_data(self):
        """
        Extracts Year, Miles, and Price from each listing. Stores data in 
        self.value

        Returns
        -------
        None.

        """

        for item in self.listings:

            # breakpoint()
            try:
                year = item['year']
                miles = item['specifications']['mileage']['value']
                miles = int(re.sub("[^0-9]", '', miles))
                price = item['pricingDetail']['primary']

                self.value.append([year, miles, price])
            except:
                # print('error on data placeholder')
                continue


def populate_data():

    listingsJSON = []

    listpk = 0

    carmakes = CarMake.objects.all()

    for car in carmakes:

        if car.has_somemodels():

            somemodels = car.carmodel_set.all()

            for Amodel in somemodels:

                if Amodel.has_sometrims():

                    sometrims = Amodel.cartrim_set.all()

                    for trim in sometrims:

                        res = search_res()

                        res.run_search(
                            car.carmake_value,
                            Amodel.carmodel_value,
                            trim.cartrim_value
                            )

                        for point in res.value:

                            listpk += 1

                            entry = {
                            'model': 'autoscrape.CarResult',
                            'pk': listpk,
                            'fields': {
                                'carmake_pk': car.pk,
                                'carmodel_pk': Amodel.pk,
                                'cartrim_pk': trim.pk,
                                'year': point[0],
                                'miles': point[1],
                                'price': point[2],
                                }
                            }

                            listingsJSON.append(entry)
                else:

                    res = search_res()

                    res.run_search(
                            car.carmake_value,
                            Amodel.carmodel_value
                            )
                    
                    for point in res.value:

                        listpk += 1

                        entry = {
                        'model': 'autoscrape.CarResult',
                        'pk': listpk,
                        'fields': {
                            'carmake_pk': car.pk,
                            'carmodel_pk': Amodel.pk,
                            'year': point[0],
                            'miles': point[1],
                            'price': point[2],
                            }
                        }

                        listingsJSON.append(entry)



    mypath = os.getcwd()

    with open(mypath + r'/fixtures/listings.json', 'w+') as file:
        json.dump(listingsJSON, file)

    pass




if __name__ == '__main__':

    populate_data()