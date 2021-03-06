from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import JsonResponse
from .models import *
from django.template.context_processors import csrf


def getUserFriends(user):
    friends = Friends.objects.filter(userName=user)
    if not friends or friends.count() == 0:
        return []
    else:
        return [friend.friendName for friend in friends]


@login_required(login_url='/user/login/')
def getFriendsList(request):
    userName = request.user.username

    json_object = {'user': userName, 'friends': getUserFriends(userName)}
    return JsonResponse(json_object)


@login_required(login_url='/user/login/')
def getMessagesSendByMe(request):
    userName = request.user.username
    friendName = request.GET.get('friendName')
    if not friendName:
        return JsonResponse({'status': 'error'})

    messages = Message.objects.filter(
        sender=userName, receiver=friendName.lower())
    if not messages or messages.count() == 0:
        return JsonResponse({'user': userName, 'friendName': friendName, 'messages': []})
    else:
        return JsonResponse({'user': userName, 'friendName': friendName, 'messages': [{"content": message.content, "time": message.time} for message in messages]})


@login_required(login_url='/user/login/')
def getMessagesSendByFriend(request):
    userName = request.user.username
    friendName = request.GET.get('friendName')
    if not friendName:
        return JsonResponse({'status': 'error'})

    messages = Message.objects.filter(
        sender=friendName.lower(), receiver=userName)
    if not messages or messages.count() == 0:
        return JsonResponse({'user': userName, 'friendName': friendName, 'messages': []})
    else:
        return JsonResponse({'user': userName, 'friendName': friendName, 'messages': [{"content": message.content, "time": message.time} for message in messages]})


@login_required(login_url='/user/login/')
def getLastMessageSendByFriend(request):
    userName = request.user.username
    friendName = request.GET.get('friendName')
    if not friendName:
        return JsonResponse({'status': 'error'})

    if not isFriend(userName, friendName):
        return JsonResponse({'status': 'error'})

    messages = Message.objects.filter(
        sender=friendName.lower(), receiver=userName)
    if not messages or messages.count() == 0:
        return JsonResponse({'user': userName, 'friendName': friendName, 'messages': []})
    else:
        message = messages[len(messages) - 1]
        return JsonResponse({'user': userName, 'friendName': friendName, 'messages': [{"content": message.content, "time": message.time}]})


@login_required(login_url='/user/login/')
def getMessagesLength(request):
    userName = request.user.username
    friendName = request.GET.get('friendName')
    if not friendName:
        return JsonResponse({'status': 'error'})

    if not isFriend(userName, friendName):
        return JsonResponse({'status': 'error'})
    messageLength = 0
    messageLength += len(Message.objects.filter(
        sender=friendName.lower(), receiver=userName))
    messageLength += len(Message.objects.filter(
        sender=userName, receiver=friendName.lower()))

    return JsonResponse({'user': userName, 'friendName': friendName, 'length': messageLength})


@ login_required(login_url='/user/login/')
def getCsrfToken(request):
    return JsonResponse({'csrfToken': str(csrf(request)['csrf_token'])})


@ login_required(login_url='/user/login/')
def sendMessage(request):
    if(request.method != 'POST'):
        return JsonResponse({'status': 'error', "message": "method not allowed"})
    userName = request.user.username
    friendName = request.POST.get('friendName')
    content = request.POST.get('content')
    # print(userName, friendName, content)
    if not content or not friendName or not isFriend(userName, friendName):
        return JsonResponse({'status': 'error'})

    message = Message(sender=userName,
                      receiver=friendName.lower(), content=content)
    message.save()
    return JsonResponse({'status': 'success'})


def isFriend(userName, friendName):
    friends = Friends.objects.filter(userName=userName.lower())
    if not friends or friends.count() == 0:
        return False
    else:
        if friends.filter(friendName=friendName.lower()):
            return True
        else:
            return False


@ login_required(login_url='/user/login/')
def addFriend(request):
    userName = request.user.username
    friendName = request.GET.get('friendName')

    if not friendName or isFriend(userName, friendName):
        return JsonResponse({'status': 'error'})
    if not User.objects.filter(username=friendName).exists():
        return JsonResponse({'status': 'error'})
    if userName.lower() == friendName.lower():
        return JsonResponse({'status': 'error'})

    Friends(userName=userName, friendName=friendName.lower()).save()
    Friends(userName=friendName.lower(), friendName=userName).save()
    return JsonResponse({'status': 'success'})


@ login_required(login_url='/user/login/')
def removeFriend(request):
    userName = request.user.username
    friendName = request.GET.get('friendName')
    if not friendName or not isFriend(userName, friendName):
        return JsonResponse({'status': 'error'})
    Friends.objects.filter(
        userName=userName, friendName=friendName.lower()).delete()
    Friends.objects.filter(userName=friendName.lower(),
                           friendName=userName).delete()
    return JsonResponse({'status': 'success'})


@ login_required(login_url='/user/login/')
def getUserInfo(request):
    userName = request.user.username
    return JsonResponse({'userName': userName})
