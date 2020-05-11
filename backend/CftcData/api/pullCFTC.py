
import pandas as pd
import math
from bs4 import BeautifulSoup
import requests
import time
import pyrebase
import csv
import signal
from datetime import datetime, timedelta
import os

from keys import config


#BS Data Cleaning
csvPath = os.path.abspath("ExchangeInfo.csv")
ExchInput = pd.read_csv(csvPath)
ExchInput = ExchInput.to_dict(orient='list')
keys = list(ExchInput)

url = r'https://www.cftc.gov'


firebase = pyrebase.initialize_app(config)
db = firebase.database()

for key in keys:
    ExchInput[key] = [x for x in ExchInput[key] if str(x) != 'nan']


def storeData(comod,net,date):

    comod = comod.replace('.','')
    comod = comod.replace('#','')

    #mo-dy-yr --> yr-mo-dy
    date = date[4:]+date[:2]+date[2:4]

    while True:
        try:
            payload = {date: 
                {
                'date': date,
                'Net Long': net
                }}
            res = db.child(comod).update(payload)
        except:
            print('cant update {} {}'.formate(comod,date))
            continue
        break
    
    print(comod,net,date)


def extractData(link, key):

    built_url = url+link

    date = link[-10:-4]


    for i in range(10):
        try:
            with requests.session() as s:
                html = s.get(built_url, timeout=30)

        except requests.exceptions.RequestException as errt:
            print('error on {}'.format(link), errt)
            time.sleep(30)
            if i == 9:
                return
            continue
        break
    if html.status_code != 200:
        print('error on extractData {}'.format(link))
        Exception()

    soup = BeautifulSoup(html.content, "html.parser").text

    data = soup.splitlines()
    Comods = ExchInput[key]

    for comod in Comods:
        for i, line in enumerate(data):
            if comod not in line:
                continue
            else:
                res = data[i+10]
                res = res.split()
                lng = float(res[3].replace(',',''))
                sht = float(res[4].replace(',',''))
                net = lng-sht
                storeData(comod,net, date)
                break

    pass

def stripResults(href):
    
    href = href.replace('.html', '')

    date = href[-6:]
    yr = href[-2:]

    for key in keys:
        if key == 'Chicago Board of Trade':
            url_start = 'deacbtlof'
        elif key == 'ICE Futures U.S.':
            url_start = 'deanybtlof'
        elif key == 'New York Mercantile Exchange':
            url_start = 'deanymelof'
        elif key == 'Chicago Mercantile Exchange':
            url_start = 'deacmelof'
        elif key == 'Chicago Board Options Exchange':
            url_start = 'deacboelof'
        elif key == 'Commodity Exchange Incorporated':
            url_start = 'deacmxlof'

        link = '/sites/default/files/files/dea/cotarchives/20' +yr+ '/options/'+ url_start + date + '.htm'

        extractData(link, key)

    pass

def extractRecent(link, key):
    built_url = url+link

    today = datetime.today()
    offset = (today.weekday() -1) % 7
    last_tuesday = today - timedelta(days=offset)

    yr = str(last_tuesday.year)[-2:] 
    mo = last_tuesday.month
    if mo < 10:
        mo = '0'+ str(mo)
    else:
        mo = str(mo)
    dy = last_tuesday.day
    if dy < 10:
        dy = '0'+ str(dy)
    else:
        dy = str(dy)
    date = mo + dy + yr

    for i in range(10):
        try:
            with requests.session() as s:
                html = s.get(built_url, timeout=30)
                break
        except requests.exceptions.RequestException as errt:
            print('error on {}'.format(link), errt)
            time.sleep(30)
            if i == 9:
                return
            continue
        break
    if html.status_code != 200:
        print('error on extractData {}'.format(link))
        Exception()

    soup = BeautifulSoup(html.content, "html.parser").text

    data = soup.splitlines()
    Comods = ExchInput[key]

    for comod in Comods:
        for i, line in enumerate(data):
            if comod not in line:
                continue
            else:
                res = data[i+10]
                res = res.split()
                lng = float(res[3].replace(',',''))
                sht = float(res[4].replace(',',''))
                net = lng-sht
                storeData(comod,net, date)
                break

def stripRecent():
    for key in keys:
        if key == 'Chicago Board of Trade':
            url_start = 'deacbtlof'
        elif key == 'ICE Futures U.S.':
            url_start = 'deanybtlof'
        elif key == 'New York Mercantile Exchange':
            url_start = 'deanymelof'
        elif key == 'Chicago Mercantile Exchange':
            url_start = 'deacmelof'
        elif key == 'Chicago Board Options Exchange':
            url_start = 'deacboelof'
        elif key == 'Commodity Exchange Incorporated':
            url_start = 'deacmxlof'

        link = '/dea/options/'+ url_start + '.htm'

        extractRecent(link, key)

def getHistorical():
    try:
        with requests.session() as s:
            html = s.get(url+'/MarketReports/CommitmentsofTraders/HistoricalViewable/index.htm', timeout=30)
    except:
        print('error on main')
    if html.status_code != 200:
        print('error on main')
        Exception()
    
    soup = soup = BeautifulSoup(html.content, "html.parser")
    tables = soup.findAll('table')
    tables.pop(-1)

    hrefs = []

    for table in tables:
        links = table.findAll('a')

        for link in links:
            try:
                hrefs.append(link['href'])
            except:
                continue

    for href in hrefs:
        stripResults(href)
    pass

if __name__ == '__main__':
    stripRecent()

    # getHistorical()

    # stripResults('/MarketReports/CommitmentsofTraders/HistoricalViewable/cot031720')