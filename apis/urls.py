from django.urls import path
from .views import *

urlpatterns = [
    # 用户管理模块
    # login / register / getUserInfo / getCsrfToken / assistant

    # 好友管理模块
    path("addFriend", addFriend),
    path("getFriendsList", getFriendsList),
    path("removeFriend", removeFriend),

    # 消息管理模块
    path("getMessagesLength", getMessagesLength),
    
    path("getMessagesSendByMe", getMessagesSendByMe),
    path("getMessagesSendByFriend", getMessagesSendByFriend),
    path("sendMessage", sendMessage),
    path("getLastMessageSendByFriend", getLastMessageSendByFriend),

    # 辅助模块
    path("getUserInfo", getUserInfo),
    path("getCsrfToken", getCsrfToken),
]
