from django.urls import path
from .views import Index, EventAPI, EventDetailAPI


app_name = 'djkalendar'

urlpatterns = [
	path('', Index.as_view(), name='index'),
	path('api/events/', EventAPI.as_view(), name='api-events'),
	path('api/events/<int:id>/', EventDetailAPI.as_view(), name='api-events-detail')
]