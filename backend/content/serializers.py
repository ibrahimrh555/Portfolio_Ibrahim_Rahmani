from rest_framework import serializers

from .models import Category, Post, Project


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name", "slug")


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = (
            "id", "title", "slug", "short_description", "description",
            "image_url", "technologies", "github_url", "demo_url",
            "featured", "order", "created_at", "updated_at",
        )


class PostListSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source="category.name", allow_null=True)

    class Meta:
        model = Post
        fields = (
            "id", "title", "slug", "excerpt", "cover_image_url", "tags",
            "category", "featured", "read_time", "published_at",
        )


class PostDetailSerializer(PostListSerializer):
    class Meta(PostListSerializer.Meta):
        fields = PostListSerializer.Meta.fields + ("content", "updated_at")
