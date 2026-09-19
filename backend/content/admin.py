from django.contrib import admin

from .models import (
    Category,
    CategoryTranslation,
    Post,
    PostTranslation,
    Project,
    ProjectTranslation,
)


class CategoryTranslationInline(admin.TabularInline):
    model = CategoryTranslation
    extra = 0
    min_num = 1


class ProjectTranslationInline(admin.StackedInline):
    model = ProjectTranslation
    extra = 0
    min_num = 1


class PostTranslationInline(admin.StackedInline):
    model = PostTranslation
    extra = 0
    min_num = 1


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    search_fields = ("name", "translations__name")
    prepopulated_fields = {"slug": ("name",)}
    inlines = (CategoryTranslationInline,)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "published", "featured", "order", "updated_at")
    list_filter = ("published", "featured")
    list_editable = ("published", "featured", "order")
    search_fields = (
        "title", "short_description", "description",
        "translations__title", "translations__short_description", "translations__description",
    )
    prepopulated_fields = {"slug": ("title",)}
    inlines = (ProjectTranslationInline,)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "featured", "category", "published_at", "updated_at")
    list_filter = ("status", "featured", "category")
    list_editable = ("status", "featured")
    search_fields = (
        "title", "excerpt", "content",
        "translations__title", "translations__excerpt", "translations__content",
    )
    prepopulated_fields = {"slug": ("title",)}
    date_hierarchy = "published_at"
    inlines = (PostTranslationInline,)
