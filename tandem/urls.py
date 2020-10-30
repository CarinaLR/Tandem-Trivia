from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),

    # API Routes
    path("questions", views.question, name="question"),
    path("options", views.option, name="option"),
]
