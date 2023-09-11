from django.db import models
from api.user.models import User
# Create your models here.
class Story(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    authorId = models.ForeignKey(User, on_delete=models.CASCADE) 
    genre = models.CharField(max_length=100)
    setting = models.CharField(max_length=100)
    age_group = models.CharField(max_length=50)
    prologue = models.TextField()
    status = models.CharField(max_length=50)
    rating = models.DecimalField(max_digits=3, decimal_places=2)
    reviews = models.ForeignKey('Review', on_delete=models.SET_NULL, null=True) 
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class Reply(models.Model):
    id = models.AutoField(primary_key=True)
    commentId = models.ForeignKey('Comment', on_delete=models.CASCADE)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    reviewId = models.ForeignKey('Review', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reply to Comment ID {self.commentId.id}"
    
class Review(models.Model):
    id = models.AutoField(primary_key=True)
    storyId = models.ForeignKey('Story', on_delete=models.CASCADE)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review for Story ID {self.storyId.id}"
    
class Chapter(models.Model):
    id = models.AutoField(primary_key=True)
    storyId = models.ForeignKey('Story', on_delete=models.CASCADE) 
    userId = models.ForeignKey(User, on_delete=models.CASCADE) 
    order = models.PositiveIntegerField()
    rating = models.DecimalField(max_digits=3, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Chapter {self.order} of Story ID {self.storyId.id}"
    
class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    storyId = models.ForeignKey('Story', on_delete=models.CASCADE)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    chapterId = models.ForeignKey('Chapter', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by User ID {self.userId.id} on Chapter ID {self.chapterId.id}"