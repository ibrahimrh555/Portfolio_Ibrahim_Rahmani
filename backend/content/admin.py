from django.contrib import admin

from .models import Category, Post, Project


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "published", "featured", "order", "updated_at")
    list_filter = ("published", "featured")
    list_editable = ("published", "featured", "order")
    search_fields = ("title", "short_description", "description")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "featured", "category", "published_at", "updated_at")
    list_filter = ("status", "featured", "category")
    list_editable = ("status", "featured")
    search_fields = ("title", "excerpt", "content")
    prepopulated_fields = {"slug": ("title",)}
    date_hierarchy = "published_at"
