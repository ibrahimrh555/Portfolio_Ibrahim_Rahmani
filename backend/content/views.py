from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Category, Post, Project
from .serializers import CategorySerializer, PostDetailSerializer, PostListSerializer, ProjectSerializer


class ApiRootView(APIView):
    def get(self, request):
        return Response({
            "projects": request.build_absolute_uri("projects/"),
            "posts": request.build_absolute_uri("posts/"),
            "categories": request.build_absolute_uri("categories/"),
        })


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProjectSerializer
    lookup_field = "slug"

    def get_queryset(self):
        queryset = Project.objects.filter(published=True)
        featured = self.request.query_params.get("featured")
        if featured in {"true", "false"}:
            queryset = queryset.filter(featured=featured == "true")
        return queryset


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = "slug"

    def get_queryset(self):
        queryset = Post.objects.filter(status=Post.Status.PUBLISHED).select_related("category")
        featured = self.request.query_params.get("featured")
        if featured in {"true", "false"}:
            queryset = queryset.filter(featured=featured == "true")
        return queryset

    def get_serializer_class(self):
        return PostDetailSerializer if self.action == "retrieve" else PostListSerializer


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = "slug"
