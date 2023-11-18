from rest_framework import serializers
from .models import ProgrammingQ

class programmingQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgrammingQ
        fields = '__all__'

class VarInputSerializer(serializers.Serializer):
    lbdp = serializers.CharField()
    lblp = serializers.CharField()