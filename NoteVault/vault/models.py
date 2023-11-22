from django.db import models
from django.contrib.auth.models import AbstractUser
# from phonenumber_field.modelfields import PhoneNumberField
from .manager import UserManager

# Create your models here.
class CustomUser(AbstractUser):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Others', 'Others'),
    ]
    TYPE = [
        ('Student', 'Student'),
        ('Teacher', 'Teacher'),
        ('Librarian', 'Librarian'),
    ]
    uid = models.IntegerField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, unique=True)
    gender = models.CharField(max_length=100, choices=GENDER_CHOICES)
    phone_number = models.BigIntegerField(unique=True)
    address = models.TextField()
    image = models.ImageField()
    type = models.CharField(max_length=100, choices=TYPE)
    USERNAME_FIELD = 'username'
    objects = UserManager()

    def __str__(self):
        return self.username

class Notes(models.Model):
    title = models.CharField(max_length=100)
    file = models.CharField(max_length=4096)
    is_approved = models.CharField(max_length = 5, default="false")
    approved_on = models.DateField(auto_now_add=True)
    uploaded_by = models.CharField(max_length=100)
    approved_by = models.CharField(max_length=100)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)
    # count = models.IntegerField(default=0)

    def __str__(self):
        return self.title

class Book(models.Model):
    title = models.CharField(max_length=100)
    file = models.CharField(max_length=1024)
    is_approved = models.CharField(max_length = 5, default="false")
    approved_on = models.DateField(auto_now_add=True)
    uploaded_by = models.CharField(max_length=100)
    approved_by = models.CharField(max_length=100)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)
    author = models.CharField(max_length=100)
    edition = models.CharField(max_length=100)
    cover_page = models.CharField(max_length=1024)
    count = models.IntegerField(default=0)

    def __str__(self):
        return self.title

class Paper(models.Model):
    CATEGORY_CHOICES = [
        ('In Sem', 'In Sem'),
        ('Mid Sem', 'Mid Sem'),
        ('End Sem', 'End Sem'),
        ('Quiz', 'Quiz'),
        ('Assignment', 'Assignment'),
        ('Others', 'Others')
    ]
    title = models.CharField(max_length=100)
    file = models.CharField(max_length=4096)
    is_approved = models.CharField(max_length = 5, default="false")
    approved_on = models.DateField(auto_now_add=True)
    uploaded_by = models.CharField(max_length=100)
    approved_by = models.CharField(max_length=100)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)
    year = models.IntegerField()
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES)

    def __str__(self):
        return self.title

class Video(models.Model):
    title = models.CharField(max_length=100)
    link = models.CharField(max_length=200)
    is_approved = models.CharField(max_length = 5, default="false")
    approved_on = models.DateField(auto_now_add=True)
    uploaded_by = models.CharField(max_length=100)
    approved_by = models.CharField(max_length=100)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)
    # count = models.IntegerField(default=0)

    def __str__(self):
        return self.title

class Course(models.Model):
    title = models.CharField(max_length=100)
    course_code = models.CharField(max_length=100)
    course_credits = models.IntegerField()
    count = models.IntegerField(default=0)

    def __str__(self):
        return self.course_code
    
