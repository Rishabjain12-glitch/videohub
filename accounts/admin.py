from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import UserProfile, Video

# Customize the admin interface
admin.site.site_header = "YouTube Clone Admin"
admin.site.site_title = "YouTube Clone Admin Portal"
admin.site.index_title = "Welcome to YouTube Clone Administration"

class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Profile'
    fields = ('email_verified', 'verification_token', 'created_at', 'updated_at')
    readonly_fields = ('verification_token', 'created_at', 'updated_at')

class CustomUserAdmin(UserAdmin):
    inlines = (UserProfileInline,)
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'get_email_verified')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'date_joined')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    ordering = ('-date_joined',)
    
    def get_email_verified(self, obj):
        try:
            return obj.userprofile.email_verified
        except UserProfile.DoesNotExist:
            return False
    get_email_verified.short_description = 'Email Verified'
    get_email_verified.boolean = True

@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'uploader', 'upload_date', 'views', 'likes', 'dislikes')
    list_filter = ('upload_date', 'uploader')
    search_fields = ('title', 'description', 'uploader__username')
    ordering = ('-upload_date',)
    readonly_fields = ('upload_date',)
    
    fieldsets = (
        ('Video Information', {
            'fields': ('title', 'description', 'uploader')
        }),
        ('Statistics', {
            'fields': ('views', 'likes', 'dislikes', 'upload_date'),
            'classes': ('collapse',)
        }),
    )

# Re-register UserAdmin
admin.site.unregister(User)
