from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("courses",CourseViewSet, basename="courses")
router.register("studentsAndCourses",StudentAndCoursesViewSet, basename="studentsAndCourses")
urlpatterns = router.urls

# urlpatterns = [
#     path('', home)
# ]