import json

from rest_framework.response import Response
from rest_framework.decorators import api_view

from .fromFirebase import getKeys, getData

@api_view(['GET'])
def getCFTCkeys(request):
    keys = getKeys()

    return Response({'keys': keys})

@api_view(['GET'])
def getCFTCdata(request):

    endDate = request.query_params.get('endDate', '')
    keyStr = request.query_params.get('keys', [])

    keys = json.loads(keyStr)

    results = getData(keys, endDate)

    return Response({'results': results})



