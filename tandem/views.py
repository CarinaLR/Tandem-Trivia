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
    question_arr = []

    # Appended each question to send a serialized response filtering fields
    for question in questionAll:
        question_arr.append({"id": question.pk, "content": question.content})

    # Shows all the fields from queryset, including model and pk
    # question_serialized = serializers.serialize(
    #     'json', questionAll)
    # return JsonResponse(question_serialized, safe=False)

    return JsonResponse(question_arr, safe=False)


def option(request):
    optionAll = Option.objects.all().order_by('pk')
    option_arr = []

    # Appended each option with corresponding questionId
    for option in optionAll:
        questionId = option.question.pk
        questionId_str = str(questionId)
        option_arr.append({"questionId": questionId_str,
                           "content": option.content, "correct": option.is_correct})
    return JsonResponse(option_arr, safe=False)
