from django.db import models


class Session(models.Model):
    Id = models.AutoField(primary_key=True)
    Goal = models.CharField(max_length=100)
    Exercise_Count = models.IntegerField()
    Duration = models.DurationField()
    Date = models.DateField(auto_now_add=True)
    Notes = models.TextField(blank=True)
