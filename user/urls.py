from django.urls import path
from .views import *

urlpatterns = [
    # 用户管理模块
    path('login/', login),
    path("register/", register),

    # 辅助模块
    path("assistant/<str:content>", assistant),

]
