from rest_framework.routers import DefaultRouter
from django.urls import path


from .views import (
    CarMakeViewSet, 
    CarModelViewSet, 
    CarTrimViewSet, 
    CarResultViewSet,
    getPopulatedMakes,
    getPopulatedModels,
    getPopulatedTrims,
    getModelHasTrims,
    getMakeHasModels,
    getBestBuy
)

router = DefaultRouter()
router.register('makes', CarMakeViewSet, basename='Makes')
router.register('models', CarModelViewSet, basename='Models')
router.register('trims', CarTrimViewSet, basename='Trims')
router.register('results', CarResultViewSet, basename='Results')
router.register('populatedMakes', getPopulatedMakes, basename='PopulatedMakes')
router.register('populatedModels', getPopulatedModels, basename='PopulatedModels')
router.register('populatedTrims', getPopulatedTrims, basename='PopulatedTrims')

urlpatterns = [
    path('modelHasTrims/', getModelHasTrims),
    path('makeHasModels/', getMakeHasModels),
    path('getBestBuy/', getBestBuy),
]

urlpatterns += router.urls
