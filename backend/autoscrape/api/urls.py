from rest_framework.routers import DefaultRouter

from .views import CarMakeViewSet, CarModelViewSet, CarTrimViewSet, CarResultViewSet

router = DefaultRouter()
router.register('makes', CarMakeViewSet, basename='Makes')
router.register('models', CarModelViewSet, basename='Models')
router.register('trims', CarTrimViewSet, basename='Trims')
router.register('results', CarResultViewSet, basename='Results')
urlpatterns = router.urls