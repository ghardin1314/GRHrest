import pyrebase
from datetime import datetime
import statistics

from .keys import config



def getKeys():

    firebase = pyrebase.initialize_app(config)
    db = firebase.database()

    keys = db.shallow().get()

    keys = sorted(list(keys.val()))    

    keys.pop()

    return keys

def get3YearData(pbKey, endDate=''):

    firebase = pyrebase.initialize_app(config)
    db = firebase.database()

    #date input as Mo-Dy-Yr. Translate to Yr-Mo-Dy
    if endDate == '':
        yr = str(datetime.now().year)[-2:] 
        mo = datetime.now().month
        if mo < 10:
            mo = '0'+ str(mo)
        else:
            mo = str(mo)
        dy = datetime.now().day
        if dy < 10:
            dy = '0'+ str(dy)
        else:
            dy = str(dy)
    else:
        yr = endDate[-2:]
        mo = endDate[:2]
        dy = endDate[2:4]
    endDate = yr + mo + dy

    res = db.child(pbKey).order_by_key().end_at(endDate).limit_to_last(52*3).get()

    data = res.val()

    netLong = []
    keys = list(data)
    lastDate = data[keys[-1]]['date']

    lastDate = str(lastDate[2:4])+'-'+str(lastDate[4:])+'-'+str(lastDate[:2])


    for dat in data:
        netLong.append(data[dat]['Net Long'])

    latest = netLong[-1]
    WWchange = netLong[-1]-netLong[-2]

    avg3Mo = round(sum(netLong[-12:])/12, 0)
    avg6Mo = round(sum(netLong[-25:])/25, 0)
    avg1yr = round(sum(netLong[-52:])/52, 0)
    avg3yr = round(sum(netLong)/len(netLong), 0)
    max3yr = max(netLong)
    min3yr = min(netLong)
    stdDev1yr = statistics.pstdev(netLong[-52:])
    zScore1yr = round((netLong[-1]-avg1yr)/stdDev1yr, 2)
    stdDev3yr = statistics.pstdev(netLong)
    zScore3yr = round((netLong[-1]-avg3yr)/stdDev3yr, 2)

    results = {
        pbKey: {
        'Latest': latest,
        'W/W Chg': WWchange,
        '3M Avg': avg3Mo,
        '6M Avg': avg6Mo,
        '1Y Avg': avg1yr,
        '3Y Max': max3yr,
        '3Y Min': min3yr,
        '1Y Z-Score': zScore1yr,
        '3Y Z-Score': zScore3yr,
        'Last Updated': lastDate
    }}

    return results

if __name__ == '__main__':
    res = getKeys()
    # print(res)
    keys = ["10-YEAR US TREASURY NOTES"]

    res1 = get3YearData(res[0])
    print(res1)