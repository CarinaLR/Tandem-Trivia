from django.http import HttpResponse
from django.shortcuts import render

from .models import Session, Question, Option

# Create your views here.


def index(request):
    return render(request, "tandem/index.html")
