from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
import uuid

User = get_user_model()

# To ensure the latest user model is always fetched (to test later if current implementation does not update)
# from django.contrib.auth import get_user_model
# User = get_user_model()

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = (
                    "CourseID",
                    "CreatorID", 
                    "Name",
                    "Description",
                    "Subject",
                    "NumberOfSteps",
                    "IsDeleted"
                )
       

class StudentAndCoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentsAndCourses
        fields = (                  
                    "UserID",
                    "CourseID",
                    "CurrentProgress",
                    "Completed",
                    "CompletedDate"
                )        


class UsersSerializer(serializers.ModelSerializer):
    # This field is only for writing (when creating a user), not for reading.
    # We require a minimum password length.
    # password = serializers.CharField(write_only=True, min_length=8) 

    class Meta:
        model = User
        fields = ("username","email","password", "userType")
        read_only_fields = ("id",)
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, valid_data):
        user = User.objects.create_user(**valid_data)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret.pop('password', None)
        return ret
