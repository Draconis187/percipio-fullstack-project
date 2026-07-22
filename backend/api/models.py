from django.db import models
import uuid
from django.conf import settings


# Create your models here.
class Courses(models.Model):
    CourseID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    CreatorID = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    Name = models.CharField(max_length=100)
    Description = models.CharField(max_length=1000)
    Subject = models.CharField(max_length=50)
    NumberOfSteps = models.SmallIntegerField()
    CreatedDate = models.DateField(auto_now=False, auto_now_add=True)
    IsDeleted = models.BooleanField()

    def __str__(self):
        return self.Name

class StudentsAndCourses(models.Model):
    SACID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    UserID = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    CourseID = models.ForeignKey(Courses, on_delete=models.PROTECT)
    CurrentProgress = models.SmallIntegerField()
    Completed = models.BooleanField()
    CompletedDate = models.DateField(auto_now=False, auto_now_add=False)