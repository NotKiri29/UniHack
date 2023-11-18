import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ProgrammingQ
from .serializers import programmingQuestionSerializer
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .serializers import VarInputSerializer

class programmingQuestionView(APIView):
        GENERATIVE_API_URL = ""
        
        def post(self, request, difficulty='easy'):
            api_url= ""
            params={'amount':10, 'difficulty': difficulty, 'type': 'multiple'}
            
            response = requests.get(f"{self.GENERATIVE_API_URL}/generate_questions", params=params)
            
            if response.status_code == 200:
                data = response.json()['questions']
                
                for question_data in data:
                    ProgrammingQ.objects.create(
                        language=question_data['language'],
                        difficulty=question_data['difficulty'],
                        question=question_data['question'],
                        correct_answer=question_data['correct_answer'],
                        incorrect_answers=question_data['incorrect_answers']
                    )
                    
                    
                questions=ProgrammingQ.objects.filter(difficulty=difficulty)
                serializer=programmingQuestionSerializer(questions, many=True)
                return response(serializer.data, status=status.HTTP_200_ok)
            else:
                return Response({'error': 'Failed to fetch exercise'}, status=response.status_code)

class ConvertVariables(APIView):
    def post(self, request, *args, **kwargs):
        serializer = VarInputSerializer(data=request.data)
        if serializer.is_valid():
            lbdp = serializer.validated_data['lbdp']
            lblp = serializer.validated_data['lblp']

            # Perform the conversion
            diff = lbdp + lblp
            lang = "Python"

            # Return the result
            result = {'diff': diff, 'lang': lang}
            return Response(result, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def post(self,request):
    data = json.loads(request.body)
    user_answer=data.get('answer', '').lower()
    
    question_id=data.get('question_id')
    response=request.get(f"{self.GENERATIVE_API_URL}/get_correct_answeer",params={'question_id':question_id})
    
    if response.status_code == 200:
        correct_answer = response.json().get('correct_answer', '').lower()
        result = user_answer == correct_answer
        return JsonResponse({'result': result})
    else:
        return JsonResponse({'error': 'Failed to fetch correct answer from the generative API'})
