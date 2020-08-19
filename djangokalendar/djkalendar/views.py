from django.shortcuts import render, get_object_or_404
from django.views.generic import View
from django.http import JsonResponse
from .serializers import EventSerializer
from .models import Event
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response



class Index(View):
	def get(self, request):
		events = Event.objects.all()
		context = {
			'events': events
		}
		return render(request, 'djkalendar/kalendar.html', context = context)
	def post(self, request):
		pass



class EventAPI(APIView):
	def get(self, request):
		events = Event.objects.all()
		serializer = EventSerializer(events, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)
	def post(self, request):
		serializer = EventSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventDetailAPI(APIView):
	def get(self, request, id):
		event = get_object_or_404(Event, id=id)
		serializer = EventSerializer(event)
		return Response(serializer.data, status=status.HTTP_200_OK)
	def put(self, request):
		event = get_object_or_404(Event, id=reques.data['id'])
		serializer = EventSerializer(instace=event, data=request.data)
		if serializer.is_valid():
			return Response(serializer.data, status=status.HTTP_201_CREATED)
	def delete(self, request, id):
		event = get_object_or_404(Event, id=id)
		event.delete()
		return Response({'message': 'Event deleted successfully'}, status=status.HTTP_200_OK)