from django.shortcuts import redirect, render
from django.http import HttpRequest, HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from sympy import content
# Create your views here.
# 用户登陆界面


def login(request: HttpRequest):
    emailRegister = request.GET.get('email')
    passRegister = request.GET.get('pass')

    if emailRegister and passRegister:
        user = authenticate(username=emailRegister, password=passRegister)
        if user is not None:
            login(request, user)
            # A backend authenticated the credentials
            return HttpResponse('登陆成功')
            pass
        else:
            return redirect("/user/assistant/" + "帐户名或者密码错误")
    return render(request, 'login.html')


# 用户注册界面
def register(request: HttpRequest):

    emailRegister = request.GET.get('email')
    passRegister = request.GET.get('pass')
    pass2Register = request.GET.get('pass2')
    if emailRegister and passRegister and pass2Register:
        if passRegister == pass2Register:
            if len(passRegister) < 5:
                return redirect("/user/assistant/" + "密码过短或强度过低")

            if User.objects.filter(username=emailRegister).exists():
                return redirect("/user/assistant/" + "帐户已存在")

            user = User.objects.create_user(
                emailRegister, emailRegister, passRegister)
            user.save()
            return redirect("/user/assistant/" + "注册成功")

        else:
            return redirect("/user/assistant/" + "两次密码不一致")

    return render(request, 'register.html')


def assistant(request: HttpRequest, content):
    return render(request, 'assistant.html', {"content": content})


def user_register(request: HttpRequest):
    return render(request, 'user_register.html')


def user_login(request: HttpRequest):
    return render(request, 'user_login.html')
