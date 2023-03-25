from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User, auth
from django.contrib.auth import authenticate, login
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib import messages
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.middleware.csrf import get_token
from django.http import HttpResponseBadRequest
from .models import Profile, Asset
from .serializers import AssetSerializer
import json



class AssetListCreateView(generics.ListCreateAPIView):
    serializer_class = AssetSerializer

    def get_queryset(self):
        user = self.request.user
        return Asset.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AssetRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AssetSerializer

    def get_queryset(self):
        user = self.request.user
        return Asset.objects.filter(user=user)




@login_required
def index(request):
    return render(request, 'index.html')

@login_required
def assets(request):
    if request.method == 'GET':
        view = AssetListCreateView.as_view()
        return view(request)
    elif request.method == 'POST':
        view = AssetListCreateView.as_view()
        return view(request)
    elif request.method in ['PUT', 'PATCH']:
        view = AssetRetrieveUpdateDestroyView.as_view()
        return view(request)
    elif request.method == 'DELETE':
        view = AssetRetrieveUpdateDestroyView.as_view()
        return view(request)
    else:
        return HttpResponseBadRequest()



@csrf_exempt
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['username']
        email = data['email']
        password = data['password']
        password2 = data['password2']

        # log the value of the X-CSRFToken header
        csrf_token = request.headers.get('X-CSRFToken')
        print('CSRF token:', csrf_token)

        if password == password2:
            if User.objects.filter(email=email).exists():
                return JsonResponse({'message': 'Email Taken', 'status': 'error'})
            elif User.objects.filter(username=username).exists():
                return JsonResponse({'message': 'Username Taken', 'status': 'error'})
            else:
                user = User.objects.create_user(username=username, email=email, password=password)
                user.save()

                user_login = auth.authenticate(username=username, password=password)
                auth.login(request, user_login)

                user_model = User.objects.get(username=username)
                new_profile = Profile.objects.create(user=user_model, id_user=user_model.id)
                new_profile.save()

                # Redirect to login page after successful account creation
                return JsonResponse({'message': 'Account created successfully', 'status': 'success'})
        else:
            return JsonResponse({'message': 'Password Not Matching', 'status': 'error'})

    # Handle GET requests to return a CSRF token
    if request.method == 'GET':
        csrf_token = get_token(request)
        return JsonResponse({'csrfToken': csrf_token})

    # Handle requests other than GET and POST
    return HttpResponseBadRequest()


@csrf_exempt
def signin(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['username']
        password = data['password']

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful', 'authenticated': True})
        else:
            return JsonResponse({'message': 'Invalid credentials', 'authenticated': False})


def test_api(request):
    return JsonResponse({'message': 'Hello from Django!!!!'})


