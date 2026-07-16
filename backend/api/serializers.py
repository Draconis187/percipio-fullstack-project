from rest_framework import serializers
from .models import *

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = (
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