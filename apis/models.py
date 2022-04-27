from django.db import models
from django.contrib.auth.models import User


class Friends(models.Model):
    userName = models.CharField(max_length=30)
    friendName = models.CharField(max_length=30)


class Message(models.Model):

    # the sender
    sender = models.CharField(max_length=30)
    # the receiver
    receiver = models.CharField(max_length=30)
    # the content of the message
    content = models.TextField()
    # the time when the message is sent
    time = models.DateTimeField(auto_now_add=True)
