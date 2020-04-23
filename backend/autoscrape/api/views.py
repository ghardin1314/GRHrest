from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.decorators import api_view


from django.shortcuts import get_object_or_404

from autoscrape.models import CarMake, CarModel, CarTrim, CarResult
from .serializers import CarMakeSerializer, CarModelSerializer, CarTrimSerializer, CarResultSerializer
from .process_results import processResults


@api_view(['GET'])
def getMakeHasModels(request):
    # print(request.query_params)
    carmake_pk = request.query_params.get('carmake_pk', None)
    # print(carmake_pk)
    if carmake_pk is not None:
        carmake = CarMake.objects.get(id=carmake_pk)
        return Response({"response": carmake.has_somemodels()})
    else:
        return Response({"response": False})

@api_view(['GET'])
def getModelHasTrims(request):
    carmodel_pk = request.query_params.get('carmodel_pk', None)
    # print(carmodel_pk)
    if carmodel_pk is not None:
        carmodel = CarModel.objects.get(id=carmodel_pk)
        return Response({"response": carmodel.has_sometrims()})
    else:
        return Response({"response": False})

class getPopulatedMakes(viewsets.ModelViewSet):
 
    serializer_class = CarMakeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):

        preSet = CarMake.objects.all()

        queryset = [make for make in preSet if make.has_someresult()]
        
        return queryset

class getPopulatedModels(viewsets.ModelViewSet):
 
    serializer_class = CarModelSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """
        Filters for carmake if requested
        """
        
        carmake_pk = self.request.query_params.get('carmake_pk', None)
        if carmake_pk is not None:
            preSet = CarModel.objects.filter(carmake_pk=carmake_pk)
        else:
            preSet = []

        queryset = [model for model in preSet if model.has_someresult()]
        
        return queryset

class getPopulatedTrims(viewsets.ModelViewSet):
 
    serializer_class = CarTrimSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """
        Filters for carmodel if requested
        """
        carmodel_pk = self.request.query_params.get('carmodel_pk', None)
        
        if carmodel_pk is not None:
            preSet = CarTrim.objects.filter(carmodel_pk=carmodel_pk)
        else:
            preSet = []

        queryset = [trim for trim in preSet if trim.has_someresult()]
        

        return queryset


class CarMakeViewSet(viewsets.ModelViewSet):

    serializer_class = CarMakeSerializer
    queryset = CarMake.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

class CarModelViewSet(viewsets.ModelViewSet):

    serializer_class = CarModelSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """
        Filters for carmake if requested
        """
        
        carmake_pk = self.request.query_params.get('carmake_pk', None)
        if carmake_pk is not None:
            queryset = CarModel.objects.filter(carmake_pk=carmake_pk)
        else:
            queryset = CarModel.objects.all()
        return queryset

class CarTrimViewSet(viewsets.ModelViewSet):

    serializer_class = CarTrimSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """
        Filters for carmake or carmodel if requested
        """
        
        carmake_pk = self.request.query_params.get('carmake_pk', None)
        carmodel_pk = self.request.query_params.get('carmodel_pk', None)
        
        if carmodel_pk is not None:
            queryset = CarTrim.objects.filter(carmodel_pk=carmodel_pk)
        elif carmake_pk is not None:
            queryset = CarTrim.objects.filter(carmake_pk=carmake_pk)
        else:
            queryset = CarTrim.objects.all()
        return queryset

class CarResultViewSet(viewsets.ModelViewSet):

    serializer_class = CarResultSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """
        Filters for carmake or carmodel or cartrim if requested
        """
        
        carmake_pk = self.request.query_params.get('carmake_pk', None)
        carmodel_pk = self.request.query_params.get('carmodel_pk', None)
        cartrim_pk = self.request.query_params.get('cartrim_pk', None)
        
        print(carmake_pk,carmodel_pk,cartrim_pk)

        if cartrim_pk is not None and cartrim_pk != '':
            queryset = CarResult.objects.filter(cartrim_pk=cartrim_pk)
        elif carmodel_pk is not None and carmodel_pk != '':
            queryset = CarResult.objects.filter(carmodel_pk=carmodel_pk)
        elif carmake_pk is not None and carmake_pk != '':
            queryset = CarResult.objects.filter(carmake_pk=carmake_pk)
        else:
            queryset = CarResult.objects.all()
        return queryset

@api_view(['GET'])
def getBestBuy(request):
    carmake_pk = request.query_params.get('carmake_pk', None)
    carmodel_pk = request.query_params.get('carmodel_pk', None)
    cartrim_pk = request.query_params.get('cartrim_pk', None)
    if cartrim_pk is not None:
        queryset = CarResult.objects.filter(cartrim_pk=cartrim_pk)
    elif carmodel_pk is not None:
        queryset = CarResult.objects.filter(carmodel_pk=carmodel_pk)
    elif carmake_pk is not None:
        queryset = CarResult.objects.filter(carmake_pk=carmake_pk)
    else:
        return Response({"year":[], "miles":[]})

    # Makes into json request form
    serializer = CarResultSerializer(queryset, many=True)
    resultsData = serializer.data

    res = Response(resultsData)

    # sends to processer to find optimal buy
    process = processResults(res.data)
    bestBuy = process.run_analysis()

    return Response({"year":bestBuy[0], "miles":bestBuy[1]})
