from django.urls import path, include, re_path
from . import views
from . import method_views
from .views import MyTokenObtainPairView, RegisterApi

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),
    path('register', RegisterApi.as_view()),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('tutorials/', views.tutorial_list), 
    path('pledge/<int:pk>/', views.user_pledge),
    path('tutorials/<int:pk>/', views.tutorial_detail, name='tutorial_detail'), 
    path('tutorials/total', views.tutorial_count),

    path('observations/', method_views.observation_list), 
    path('observations/<int:pk>/', method_views.observation_detail, name='observation_detail'), 

]
