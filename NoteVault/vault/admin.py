from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Notes)
admin.site.register(Book)
admin.site.register(Paper)
admin.site.register(Course)
admin.site.register(Video)