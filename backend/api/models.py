from django.db import models
import uuid
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager


# Create your models here.

class LMSUserManager(BaseUserManager):
    def create_user(self, username, password=None, groupType=None, **extra_fields):
        if not username:
            raise ValueError("Username is a required field")

        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("userType", 0)
        return self.create_user(username, password, **extra_fields)


class LMSUser(AbstractUser):
    userType = models.SmallIntegerField(null=True)
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=50, unique=True)

    objects = LMSUserManager()

class Courses(models.Model):
    CourseID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    CreatorID = models.ForeignKey(LMSUser, on_delete=models.PROTECT)
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
    UserID = models.ForeignKey(LMSUser, on_delete=models.PROTECT)
    CourseID = models.ForeignKey(Courses, on_delete=models.PROTECT)
    CurrentProgress = models.SmallIntegerField(null=True)
    Completed = models.BooleanField(null=True)
    CompletedDate = models.DateField(auto_now=False, auto_now_add=False, null=True)


