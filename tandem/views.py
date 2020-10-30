import json
from django.http import JsonResponse
from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.core import serializers
from django.urls import reverse
from django.shortcuts import render

from .models import Session, Question, Option

# Create your views here.


def index(request):
    return render(request, "tandem/index.html")

# Get question data and send a json respond as array of objcs


def question(request):
    questionAll = Question.objects.all().order_by('pk')
    question_serialized = serializers.serialize('json', questionAll)
    return JsonResponse(question_serialized, safe=False)
