from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            'title',
            'description',
            'starts',
            'ends',
            'timestamp',
            'completed'
        ]
    def validate(self, data):
        if data['starts'] > data['ends']:
            raise serializers.ValidationError('Start date must be before end date')
        return data