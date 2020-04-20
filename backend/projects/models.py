from django.db import models

# Create your models here.
class Project(models.Model):
    tag = models.CharField(max_length=20, primary_key=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    technology = models.CharField(max_length=50)
    image = models.URLField(max_length=500)
    

    def __str__(self):
        return str(self.pk)