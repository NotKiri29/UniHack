from django.urls import path
from .views import ConvertVariables, programmingQuestionView

urlpatterns = [
    path('exercises/', programmingQuestionView.as_view(), name='exercise-list'),
    path('api/check_answer/', programmingQuestionView.as_view(), name='check_answer'),
]
