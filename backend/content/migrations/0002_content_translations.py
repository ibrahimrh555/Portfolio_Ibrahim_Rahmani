from django.db import migrations, models
import django.db.models.deletion


def copy_existing_french_content(apps, schema_editor):
    Category = apps.get_model("content", "Category")
    CategoryTranslation = apps.get_model("content", "CategoryTranslation")
    Project = apps.get_model("content", "Project")
    ProjectTranslation = apps.get_model("content", "ProjectTranslation")
    Post = apps.get_model("content", "Post")
    PostTranslation = apps.get_model("content", "PostTranslation")

    CategoryTranslation.objects.bulk_create([
        CategoryTranslation(category_id=item.id, language="fr", name=item.name)
        for item in Category.objects.all()
    ], ignore_conflicts=True)

    ProjectTranslation.objects.bulk_create([
        ProjectTranslation(
            project_id=item.id,
            language="fr",
            title=item.title,
            short_description=item.short_description,
            description=item.description,
        )
        for item in Project.objects.all()
    ], ignore_conflicts=True)

    PostTranslation.objects.bulk_create([
        PostTranslation(
            post_id=item.id,
            language="fr",
            title=item.title,
            excerpt=item.excerpt,
            content=item.content,
        )
        for item in Post.objects.all()
    ], ignore_conflicts=True)


class Migration(migrations.Migration):
    dependencies = [("content", "0001_initial")]

    operations = [
        migrations.CreateModel(
            name="CategoryTranslation",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("language", models.CharField(choices=[("fr", "Français"), ("en", "English")], max_length=5)),
                ("name", models.CharField(max_length=100)),
                ("category", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="translations", to="content.category")),
            ],
        ),
        migrations.CreateModel(
            name="ProjectTranslation",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("language", models.CharField(choices=[("fr", "Français"), ("en", "English")], max_length=5)),
                ("title", models.CharField(max_length=200)),
                ("short_description", models.CharField(max_length=320)),
                ("description", models.TextField(blank=True)),
                ("project", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="translations", to="content.project")),
            ],
        ),
        migrations.CreateModel(
            name="PostTranslation",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("language", models.CharField(choices=[("fr", "Français"), ("en", "English")], max_length=5)),
                ("title", models.CharField(max_length=220)),
                ("excerpt", models.CharField(max_length=400)),
                ("content", models.TextField()),
                ("post", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="translations", to="content.post")),
            ],
        ),
        migrations.AddConstraint(
            model_name="categorytranslation",
            constraint=models.UniqueConstraint(fields=("category", "language"), name="unique_category_translation"),
        ),
        migrations.AddConstraint(
            model_name="projecttranslation",
            constraint=models.UniqueConstraint(fields=("project", "language"), name="unique_project_translation"),
        ),
        migrations.AddConstraint(
            model_name="posttranslation",
            constraint=models.UniqueConstraint(fields=("post", "language"), name="unique_post_translation"),
        ),
        migrations.AddIndex(
            model_name="categorytranslation",
            index=models.Index(fields=["language", "category"], name="content_cat_languag_8d573c_idx"),
        ),
        migrations.AddIndex(
            model_name="projecttranslation",
            index=models.Index(fields=["language", "project"], name="content_pro_languag_d3775e_idx"),
        ),
        migrations.AddIndex(
            model_name="posttranslation",
            index=models.Index(fields=["language", "post"], name="content_pos_languag_0160fc_idx"),
        ),
        migrations.RunPython(copy_existing_french_content, migrations.RunPython.noop),
    ]
