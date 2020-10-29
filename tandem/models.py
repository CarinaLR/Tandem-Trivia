from django.db import models

# Create your models here.


class Session(models.Model):
    questionCount = models.IntegerField()
    score = models.IntegerField()

    def __str__(self):
        return str(self.name)


class Question(models.Model):
    content = models.CharField('Question', max_length=255)

    def __str__(self):
        return self.content


class Option(models.Model):
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name='options')
    content = models.CharField('Option', max_length=255)
    is_correct = models.BooleanField('Correct', default=False)

    def __str__(self):
        return self.content
