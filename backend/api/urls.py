from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("courses",CourseViewSet, basename="courses")
router.register("studentsAndCourses",StudentAndCoursesViewSet, basename="studentsAndCourses")
router.register("users",UsersViewSet, basename="users")
router.register("login",LoginViewset, basename="login")
urlpatterns = router.urls