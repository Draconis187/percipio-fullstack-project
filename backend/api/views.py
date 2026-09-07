from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from .serializers import *
from rest_framework.response import Response
from .models import *
from django.contrib.auth import login, authenticate
from django.shortcuts import get_object_or_404
from knox.models import AuthToken

# To ensure the latest user model is always fetched (to test later if current implementation does not update)
# from django.contrib.auth import get_user_model
# User = get_user_model()



# Create your views here.
def home(request):
    return HttpResponse("This is the homepage")

class CourseViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Courses.objects.all()
    serializer_class = CourseSerializer

    def list(self, request):
        queryset = Courses.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        course = self.queryset.get(pk=pk)
        serializer = self.serializer_class(course)
        return Response(serializer.data)

    def update(self, request, pk=None):
        course = self.queryset.get(pk=pk)
        serializer = self.serializer_class(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
        
class StudentAndCoursesViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = StudentsAndCourses.objects.all()
    serializer_class = StudentAndCoursesSerializer

    def list(self, request):
        queryset = StudentsAndCourses.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None, **kwargs):
        #TODO: Try this logic in the list rather than the retrieve
        courses= StudentsAndCourses.objects.get(UserID_id= kwargs["UserID_id"])
        serializer = self.serializer_class(courses, many=True)
        return Response(serializer.data)

    def update(self, request, pk=None):
        course = self.queryset.get(pk=pk)
        serializer = self.serializer_class(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)


class UsersViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = LMSUser.objects.all()
    serializer_class = UsersSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else: 
            return Response(serializer.errors, status=400)

    def list(self, request):
        queryset = User.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UsersSerializer(user)
        return Response(serializer.data)


class LoginViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]

            user = authenticate(request, username=username, password=password)

            if user:
                _, token=AuthToken.objects.create(user)
                return Response(
                    
                    {
                        "id":user.pk,
                        "userType":user.userType,
                        "user":self.serializer_class(user).data,
                        "token": token
                    }
                        
                )
            else: 
                return Response(
                    {
                        "error": "Invalid username or password"
                    }, 
                    status=401
                    )

        else:
            return Response(serializer.errors, status=400)