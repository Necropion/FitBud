from django.db import models

class User(models.Model):
    Id = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=255)
    Email = models.EmailField(unique=True)
    Password = models.CharField(max_length=255)

    def __str__(self):
        return self.Name