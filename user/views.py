from django.shortcuts import redirect, render
from django.http import HttpRequest, HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from django.contrib.auth import login as auth_login
# Create your views here.
# 用户登陆界面


def login(request: HttpRequest):
    userRegister = request.GET.get('email')
    passRegister = request.GET.get('pass')

    if userRegister and passRegister:
        user = authenticate(username=userRegister.lower(),
                            password=passRegister)
        if user is not None:
            auth_login(request, user)
            # A backend authenticated the credentials
            return redirect("/")
        else:
            return redirect("/user/assistant/" + "帐户名或者密码错误")
    return render(request, 'login.html')


# 用户注册界面
def register(request: HttpRequest):

    userRegister = request.GET.get('email')
    passRegister = request.GET.get('pass')
    pass2Register = request.GET.get('pass2')
    if userRegister and passRegister and pass2Register:
        userRegister = userRegister.lower()
        if len(userRegister) < 2:
            return redirect("/user/assistant/" + "帐户名太短,请输入至少2个字符")
        if len(userRegister) > 30:
            return redirect("/user/assistant/" + "帐户名太长,请输入最多30个字符")

        if passRegister == pass2Register:
            if len(passRegister) < 5:
                return redirect("/user/assistant/" + "密码过短或强度过低,请输入至少5个字符")

            if User.objects.filter(username=userRegister).exists():
                return redirect("/user/assistant/" + "帐户已存在")

            user = User.objects.create_user(
                userRegister, userRegister, passRegister)
            user.save()
            return redirect("/user/assistant/" + "注册成功")

        else:
            return redirect("/user/assistant/" + "两次密码不一致")

    return render(request, 'register.html')


def assistant(request: HttpRequest, content):
    return render(request, 'assistant.html', {"content": content})
