from django.contrib import admin

from .models import Session, Question, Option

# Register your models here.

admin.site.register(Session)
admin.site.register(Question)
admin.site.register(Option)
