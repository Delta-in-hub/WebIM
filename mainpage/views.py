from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
# Create your views here.


@login_required(login_url='/user/login/')
def index(request):
    return render(request, 'webim.html')


@login_required(login_url='/user/login/')
def userlogout(request):
    logout(request)
    return redirect("/user/assistant/" + "您已经成功退出")
