import requests
import threading
import json
import concurrent.futures
import os
import time

"""
This file creates .json files to populate autoscrape database 
for options to pick from.

Should be run from GRHanalytics folder.

Sleep in the get_trims method is to avoid api limiting. Takes a long time to run.

run python manage.py loaddata xxxxx.json for each file to update database
"""


class result_obj:
    def __init__(self):
        self.value = []
        self._lock = threading.Lock()

    def get_makes(self):
        url_base = 'https://www.autotrader.com'
        path = '/rest/searchform/advanced/update'
        url = url_base + path
        headers = {
            'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36"}
        payload = {'maxMileage': '0',
                   'searchRadius': '0',
                   'zip': '90250'}
        response = requests.get(url, headers=headers, params=payload)
        try:
            results = response.json()
            makes = results['searchFormFields']['make']['searchOptions'][0]['options']
            del makes[0]
            with self._lock:
                self.value = makes
        except:
            print('error on makes')
            exit()

    def get_models(self, make, make_index):
        url_base = 'https://www.autotrader.com'
        path = '/rest/searchform/advanced/update'
        url = url_base + path
        headers = {
            'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36"}
        payload = {'makeCodeList': make,
                   'maxMileage': '0',
                   'searchRadius': '0',
                   'zip': '90250'}
        response = requests.get(url, headers=headers, params=payload)
        try:
            results = response.json()
            models = results['searchFormFields']['model']['searchOptions'][0]['options']
            del models[0]
            with self._lock:
                make = self.value[make_index]
                make['models'] = models
                self.value[make_index] = make
        except:
            print(f'error on {make["name"]}')

    def get_trims(self, make, model, make_index, model_index):
        url_base = 'https://www.autotrader.com'
        path = '/rest/searchform/advanced/update'
        url = url_base + path
        headers = {
            'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36"}
        payload = {'makeCodeList': make,
                   'modelCodeList': model,
                   'maxMileage': '0',
                   'searchRadius': '0',
                   'zip': '90250'}

        time.sleep(10)

        response = requests.get(url, headers=headers, params=payload)
        results = response.json()
        trims = results['searchFormFields']['trim']['searchOptions'][0]['options']
        del trims[0]
        with self._lock:
            model = self.value[make_index]['models'][model_index]
            print(f'getting trims for {model}')
            try:
                model['trims'] = trims
            except:
                model['trims'] = []
                print(f"error on {model['value']}")
            print(model['trims'])
            self.value[make_index]['models'][model_index] = model


def pull_data(results):

    results.get_makes()

    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:

        for make_index, make in enumerate(results.value):

            executor.submit(results.get_models, make['value'], make_index)

    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:

        for make_index, make in enumerate(results.value):

            models = make['models']

            for model_index, model in enumerate(models):

                executor.submit(
                    results.get_trims, 
                    make['value'], 
                    model['value'], 
                    make_index, 
                    model_index
                    )


def populate_json(results):

    makeJSON = []
    modelJSON = []
    trimJSON = []

    makes = results.value
    makepk = 0
    modelpk = 0
    trimpk = 0

    for make in makes:

        makepk += 1

        entry = {
            'model': 'autoscrape.CarMake',
            'pk': makepk,
            'fields': {
                'carmake_name': make.get('name'),
                'carmake_value': make.get('value')
            }
        }

        makeJSON.append(entry)

        for model in make.get('models'):

            modelpk += 1

            entry = {
                'model': 'autoscrape.CarModel',
                'pk': modelpk,
                'fields': {
                    'carmake_pk': makepk,
                    'carmodel_name': model.get('name'),
                    'carmodel_value': model.get('value')
                }
            }

            modelJSON.append(entry)

            try:
                for trim in model.get('trims'):

                    trimpk += 1

                    entry = {
                        'model': 'autoscrape.CarTrim',
                        'pk': trimpk,
                        'fields': {
                            'carmake_pk': makepk,
                            'carmodel_pk': modelpk,
                            'cartrim_name': trim.get('name'),
                            'cartrim_value': trim.get('value')
                        }
                    }

                    trimJSON.append(entry)
            except:
                print('No trims for {} model'.format(model.get('name')))

    mypath = os.getcwd()

    with open(mypath + r'/fixtures/makes.json', 'w+') as file:
        json.dump(makeJSON, file)

    with open(mypath + r'/fixtures/models.json', 'w+') as file:
        json.dump(modelJSON, file)

    with open(mypath + r'/fixtures/trims.json', 'w+') as file:
        json.dump(trimJSON, file)


if __name__ == '__main__':

    results = result_obj()

    pull_data(results)

    populate_json(results)
