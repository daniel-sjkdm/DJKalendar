from django.shortcuts import render
from django.views.generic import View
from django.http import JsonResponse


class Index(View):
	def get(self, request):
		return render(request, 'djkalendar/kalendar.html', context = {})
	def post(self, request):
		pass