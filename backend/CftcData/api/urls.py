from django.urls import path
from .views import getCFTCkeys, getCFTCdata

urlpatterns = [
    path('getCFTCkeys/', getCFTCkeys),
    path('getCFTCdata/', getCFTCdata),
]