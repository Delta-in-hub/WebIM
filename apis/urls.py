from django.urls import path
from .views import *

urlpatterns = [
    # 好友管理模块
    path("addFriend", addFriend),
    path("getFriendsList", getFriendsList),
    path("removeFriend", removeFriend),

    # 消息管理模块
    path("getMessagesSendByMe", getMessagesSendByMe),
    path("getMessagesSendByFriend", getMessagesSendByFriend),
    path("sendMessage", sendMessage),
    path("getMessagesLength", getMessagesLength),
    path("getLastMessageSendByFriend", getLastMessageSendByFriend),

    # 辅助模块
    path("getUserInfo", getUserInfo),
    path("getCsrfToken", getCsrfToken),
]
