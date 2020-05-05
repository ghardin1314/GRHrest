from rest_framework.response import Response
from rest_framework.decorators import api_view

from .fromFirebase import getKeys, get3YearData

@api_view(['GET'])
def getCFTCkeys(request):
    keys = getKeys()

    return Response({'keys': keys})

@api_view(['GET'])
def getCFTCdata(request):

    endDate = request.query_params.get('endDate', '')
    keyStr = request.query_params.get('keys', [])

    keys = keyStr.split(', ')

    # print(keys)

    results = []

    for key in keys:
        print(key)
        res = get3YearData(key, endDate )
        results.append(res)


    return Response({'results': results})



