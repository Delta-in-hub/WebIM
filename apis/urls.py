from django.urls import path
from .views import *

urlpatterns = [
    path("getFriendsList", getFriendsList),
    path("getMessagesSendByMe", getMessagesSendByMe),
    path("getMessagesSendByFriend", getMessagesSendByFriend),
    path("sendMessage", sendMessage),
    path("addFriend", addFriend),
    path("removeFriend", removeFriend),
    path("getUserInfo", getUserInfo),
]
