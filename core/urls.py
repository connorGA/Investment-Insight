from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('signup', views.signup, name='signup'),
    path('signin', views.signin, name='signin'),
    path('api/test/', views.test_api, name='test_api'),
    path('api/assets/', views.AssetListCreateView.as_view(), name='assets_list_create'),
    path('api/assets/<int:pk>/', views.AssetRetrieveUpdateDestroyView.as_view(), name='asset_retrieve_update_destroy'),
]