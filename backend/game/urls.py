from django.urls import path
from .views import play_game

urlpatterns = [
    path("play/", play_game),
]