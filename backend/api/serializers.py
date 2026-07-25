from rest_framework import serializers
from .models import *

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

class CourseDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = (
                    "CourseID",
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