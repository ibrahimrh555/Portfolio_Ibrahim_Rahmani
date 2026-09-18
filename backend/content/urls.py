from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ApiRootView, CategoryViewSet, PostViewSet, ProjectViewSet

router = DefaultRouter()
router.register("projects", ProjectViewSet, basename="project")
router.register("posts", PostViewSet, basename="post")
router.register("categories", CategoryViewSet, basename="category")

urlpatterns = [
    path("", ApiRootView.as_view(), name="api-root"),
    path("", include(router.urls)),
]
