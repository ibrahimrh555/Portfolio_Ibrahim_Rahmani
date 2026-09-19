from django.test import TestCase
from django.urls import reverse

from .models import Post, PostTranslation, Project, ProjectTranslation


class PublicApiTests(TestCase):
    def test_projects_only_return_published_items(self):
        Project.objects.create(title="Visible", short_description="Visible", published=True)
        Project.objects.create(title="Hidden", short_description="Hidden", published=False)

        response = self.client.get(reverse("project-list"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual([item["title"] for item in response.json()], ["Visible"])

    def test_posts_only_return_published_items(self):
        Post.objects.create(title="Published", excerpt="Published", content="Body", status=Post.Status.PUBLISHED)
        Post.objects.create(title="Draft", excerpt="Draft", content="Body", status=Post.Status.DRAFT)

        response = self.client.get(reverse("post-list"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual([item["title"] for item in response.json()], ["Published"])

    def test_project_uses_requested_english_translation(self):
        project = Project.objects.create(title="Projet", short_description="Description", published=True)
        ProjectTranslation.objects.create(
            project=project,
            language="en",
            title="Project",
            short_description="English description",
            description="English details",
        )

        response = self.client.get(reverse("project-list"), HTTP_ACCEPT_LANGUAGE="en")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()[0]["title"], "Project")

    def test_missing_translation_falls_back_to_french_source(self):
        Post.objects.create(
            title="Article français",
            excerpt="Résumé",
            content="Contenu",
            status=Post.Status.PUBLISHED,
        )

        response = self.client.get(reverse("post-list") + "?lang=en")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()[0]["title"], "Article français")
