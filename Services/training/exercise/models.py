from django.db import models

class Exercise(models.Model):
    Id = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=100)
    Category = models.CharField(max_length=100)
    Duration = models.IntegerField()
    Intensity = models.CharField(max_length=100)
    Description = models.TextField()

    def __str__(self):
        return self.Name