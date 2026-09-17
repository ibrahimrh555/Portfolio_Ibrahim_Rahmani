from django.test import TestCase
from django.urls import reverse

from .models import Post, Project


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
