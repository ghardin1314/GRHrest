from rest_framework.routers import DefaultRouter
from django.urls import path

from .views import getProject

router = DefaultRouter()
router.register('', getProject, basename='Project')

urlpatterns = []

urlpatterns += router.urls