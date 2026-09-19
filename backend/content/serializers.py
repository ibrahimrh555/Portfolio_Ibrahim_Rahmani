from rest_framework import serializers

from .models import Category, Post, Project


def translated_value(instance, field_name, fallback):
    translations = getattr(instance, "selected_translations", [])
    if translations:
        return getattr(translations[0], field_name)
    return fallback


class CategorySerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ("id", "name", "slug")

    def get_name(self, obj):
        return translated_value(obj, "name", obj.name)


class ProjectSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    short_description = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = (
            "id", "title", "slug", "short_description", "description",
            "image_url", "technologies", "github_url", "demo_url",
            "featured", "order", "created_at", "updated_at",
        )

    def get_title(self, obj):
        return translated_value(obj, "title", obj.title)

    def get_short_description(self, obj):
        return translated_value(obj, "short_description", obj.short_description)

    def get_description(self, obj):
        return translated_value(obj, "description", obj.description)


class PostListSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    excerpt = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = (
            "id", "title", "slug", "excerpt", "cover_image_url", "tags",
            "category", "featured", "read_time", "published_at",
        )

    def get_title(self, obj):
        return translated_value(obj, "title", obj.title)

    def get_excerpt(self, obj):
        return translated_value(obj, "excerpt", obj.excerpt)

    def get_category(self, obj):
        if obj.category is None:
            return None
        return translated_value(obj.category, "name", obj.category.name)


class PostDetailSerializer(PostListSerializer):
    content = serializers.SerializerMethodField()

    class Meta(PostListSerializer.Meta):
        fields = PostListSerializer.Meta.fields + ("content", "updated_at")

    def get_content(self, obj):
        return translated_value(obj, "content", obj.content)
