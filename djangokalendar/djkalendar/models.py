from django.db import models



class Event(models.Model):
    title = models.CharField(max_length=200, null=False)
    description = models.CharField(max_length=500, null=False)
    starts = models.DateTimeField(null=False)
    ends = models.DateTimeField(null=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title