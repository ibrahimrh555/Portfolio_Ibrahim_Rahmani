from django.db.models import Prefetch
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    Category,
    CategoryTranslation,
    Post,
    PostTranslation,
    Project,
    ProjectTranslation,
)
from .serializers import CategorySerializer, PostDetailSerializer, PostListSerializer, ProjectSerializer


def request_language(request):
    explicit = request.query_params.get("lang", "").lower()
    if explicit in {"fr", "en"}:
        return explicit
    header = request.headers.get("Accept-Language", "fr").lower()
    return "en" if header.startswith("en") else "fr"


class ApiRootView(APIView):
    def get(self, request):
        return Response({
            "language": request_language(request),
            "projects": request.build_absolute_uri("projects/"),
            "posts": request.build_absolute_uri("posts/"),
            "categories": request.build_absolute_uri("categories/"),
        })


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProjectSerializer
    lookup_field = "slug"

    def get_queryset(self):
        language = request_language(self.request)
        translations = ProjectTranslation.objects.filter(language=language)
        queryset = Project.objects.filter(published=True).prefetch_related(
            Prefetch("translations", queryset=translations, to_attr="selected_translations")
        )
        featured = self.request.query_params.get("featured")
        if featured in {"true", "false"}:
            queryset = queryset.filter(featured=featured == "true")
        return queryset


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = "slug"

    def get_queryset(self):
        language = request_language(self.request)
        post_translations = PostTranslation.objects.filter(language=language)
        category_translations = CategoryTranslation.objects.filter(language=language)
        queryset = Post.objects.filter(status=Post.Status.PUBLISHED).select_related("category").prefetch_related(
            Prefetch("translations", queryset=post_translations, to_attr="selected_translations"),
            Prefetch("category__translations", queryset=category_translations, to_attr="selected_translations"),
        )
        featured = self.request.query_params.get("featured")
        if featured in {"true", "false"}:
            queryset = queryset.filter(featured=featured == "true")
        return queryset

    def get_serializer_class(self):
        return PostDetailSerializer if self.action == "retrieve" else PostListSerializer


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CategorySerializer
    lookup_field = "slug"

    def get_queryset(self):
        language = request_language(self.request)
        translations = CategoryTranslation.objects.filter(language=language)
        return Category.objects.prefetch_related(
            Prefetch("translations", queryset=translations, to_attr="selected_translations")
        )
