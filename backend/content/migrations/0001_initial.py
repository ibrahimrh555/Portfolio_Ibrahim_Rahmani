from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True
    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Category",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=100, unique=True)),
                ("slug", models.SlugField(blank=True, max_length=120, unique=True)),
            ],
            options={"ordering": ["name"], "verbose_name_plural": "categories"},
        ),
        migrations.CreateModel(
            name="Project",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=200)),
                ("slug", models.SlugField(blank=True, max_length=200, unique=True)),
                ("short_description", models.CharField(max_length=320)),
                ("description", models.TextField(blank=True)),
                ("image_url", models.URLField(blank=True, max_length=700)),
                ("technologies", models.JSONField(blank=True, default=list)),
                ("github_url", models.URLField(blank=True)),
                ("demo_url", models.URLField(blank=True)),
                ("featured", models.BooleanField(default=False)),
                ("published", models.BooleanField(default=True)),
                ("order", models.PositiveIntegerField(default=0)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"ordering": ["order", "-created_at"]},
        ),
        migrations.CreateModel(
            name="Post",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=220)),
                ("slug", models.SlugField(blank=True, max_length=220, unique=True)),
                ("excerpt", models.CharField(max_length=400)),
                ("content", models.TextField()),
                ("cover_image_url", models.URLField(blank=True, max_length=700)),
                ("tags", models.JSONField(blank=True, default=list)),
                ("status", models.CharField(choices=[("draft", "Brouillon"), ("published", "Publié")], default="draft", max_length=12)),
                ("featured", models.BooleanField(default=False)),
                ("read_time", models.PositiveIntegerField(default=5, help_text="Temps de lecture en minutes")),
                ("published_at", models.DateTimeField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("category", models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name="posts", to="content.category")),
            ],
            options={"ordering": ["-published_at", "-created_at"]},
        ),
    ]
