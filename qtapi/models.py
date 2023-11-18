from django.db import models

class ProgrammingQ(models.Model):
    language=models.CharField(max_length=50)
    difficulty=models.CharField(max_length=20)
    questions=models.TextField()
    correct_answer=models.CharField(max_length=15000)
    incorrect_answer=models.JSONField()
