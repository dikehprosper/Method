from django.contrib import admin

# Register your models here.

from .models import Note, Observation
admin.site.register(Note)
admin.site.register(Observation)

