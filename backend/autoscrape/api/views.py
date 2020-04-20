from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from django.shortcuts import get_object_or_404

from autoscrape.models import CarMake, CarModel, CarTrim, CarResult
from .serializers import CarMakeSerializer, CarModelSerializer, CarTrimSerializer, CarResultSerializer


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
        
        carmake_pk = self.request.data.get('carmake_pk', None)
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
        
        carmake_pk = self.request.data.get('carmake_pk', None)
        carmodel_pk = self.request.data.get('carmodel_pk', None)
        
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
        Filters for carmake or carmodel if requested
        """
        
        carmake_pk = self.request.data.get('carmake_pk', None)
        carmodel_pk = self.request.data.get('carmodel_pk', None)
        cartrim_pk = self.request.data.get('cartrim_pk', None)
        

        if cartrim_pk is not None:
            queryset = CarResult.objects.filter(cartrim_pk=cartrim_pk)
        elif carmodel_pk is not None:
            queryset = CarResult.objects.filter(carmodel_pk=carmodel_pk)
        elif carmake_pk is not None:
            queryset = CarResult.objects.filter(carmake_pk=carmake_pk)
        else:
            queryset = CarResult.objects.all()
        return queryset

