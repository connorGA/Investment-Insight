from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/test/', views.test_api, name='test_api')
]