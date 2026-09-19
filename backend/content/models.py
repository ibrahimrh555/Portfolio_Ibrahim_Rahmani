from django.db import models
from django.utils import timezone
from django.utils.text import slugify


def unique_slug(instance, value):
    base = slugify(value)[:180] or "item"
    slug = base
    index = 2
    queryset = instance.__class__.objects.all()
    if instance.pk:
        queryset = queryset.exclude(pk=instance.pk)
    while queryset.filter(slug=slug).exists():
        slug = f"{base}-{index}"
        index += 1
    return slug


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slug(self, self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    short_description = models.CharField(max_length=320)
    description = models.TextField(blank=True)
    image_url = models.URLField(max_length=700, blank=True)
    technologies = models.JSONField(default=list, blank=True)
    github_url = models.URLField(blank=True)
    demo_url = models.URLField(blank=True)
    featured = models.BooleanField(default=False)
    published = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slug(self, self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Post(models.Model):
    class Status(models.TextChoices):
        DRAFT = "draft", "Brouillon"
        PUBLISHED = "published", "Publié"

    category = models.ForeignKey(Category, null=True, blank=True, on_delete=models.SET_NULL, related_name="posts")
    title = models.CharField(max_length=220)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    excerpt = models.CharField(max_length=400)
    content = models.TextField()
    cover_image_url = models.URLField(max_length=700, blank=True)
    tags = models.JSONField(default=list, blank=True)
    status = models.CharField(max_length=12, choices=Status.choices, default=Status.DRAFT)
    featured = models.BooleanField(default=False)
    read_time = models.PositiveIntegerField(default=5, help_text="Temps de lecture en minutes")
    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-published_at", "-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slug(self, self.title)
        if self.status == self.Status.PUBLISHED and self.published_at is None:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class CategoryTranslation(models.Model):
    category = models.ForeignKey(Category, related_name="translations", on_delete=models.CASCADE)
    language = models.CharField(max_length=5, choices=(("fr", "Français"), ("en", "English")))
    name = models.CharField(max_length=100)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["category", "language"], name="unique_category_translation"),
        ]
        indexes = [models.Index(fields=["language", "category"])]

    def __str__(self):
        return f"{self.category.slug} ({self.language})"


class ProjectTranslation(models.Model):
    project = models.ForeignKey(Project, related_name="translations", on_delete=models.CASCADE)
    language = models.CharField(max_length=5, choices=(("fr", "Français"), ("en", "English")))
    title = models.CharField(max_length=200)
    short_description = models.CharField(max_length=320)
    description = models.TextField(blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["project", "language"], name="unique_project_translation"),
        ]
        indexes = [models.Index(fields=["language", "project"])]

    def __str__(self):
        return f"{self.project.slug} ({self.language})"


class PostTranslation(models.Model):
    post = models.ForeignKey(Post, related_name="translations", on_delete=models.CASCADE)
    language = models.CharField(max_length=5, choices=(("fr", "Français"), ("en", "English")))
    title = models.CharField(max_length=220)
    excerpt = models.CharField(max_length=400)
    content = models.TextField()

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["post", "language"], name="unique_post_translation"),
        ]
        indexes = [models.Index(fields=["language", "post"])]

    def __str__(self):
        return f"{self.post.slug} ({self.language})"
