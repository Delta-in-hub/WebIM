from django.urls import path
from .views import *

urlpatterns = [

    path('login/', login),
    path('api/login/', user_login),

    path("register/", register),
    path("api/register/", user_register),

    path("assistant/<str:content>", assistant),

]
