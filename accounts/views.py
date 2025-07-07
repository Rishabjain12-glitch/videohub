from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.urls import reverse
from django.http import HttpResponse
from .forms import CustomUserCreationForm, CustomLoginForm
from .models import UserProfile

def register_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            # Create user profile with verification token
            profile = UserProfile.objects.create(user=user)
            
            # Simulate email verification (console backend)
            verification_url = request.build_absolute_uri(
                reverse('verify_email', kwargs={'token': profile.verification_token})
            )
            print(f"Verification URL: {verification_url}")
            
            messages.success(request, 'Registration successful! Please check your email for verification.')
            return redirect('login')
    else:
        form = CustomUserCreationForm()
    
    return render(request, 'accounts/register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = CustomLoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            
            if user is not None:
                login(request, user)
                messages.success(request, f'Welcome back, {user.username}!')
                return redirect('dashboard')
            else:
                messages.error(request, 'Invalid username or password.')
    else:
        form = CustomLoginForm()
    
    return render(request, 'accounts/login.html', {'form': form})

def logout_view(request):
    logout(request)
    messages.info(request, 'You have been logged out successfully.')
    return redirect('login')

@login_required
def dashboard_view(request):
    user_profile, created = UserProfile.objects.get_or_create(user=request.user)
    return render(request, 'accounts/dashboard.html', {
        'user_profile': user_profile
    })

def verify_email(request, token):
    try:
        profile = UserProfile.objects.get(verification_token=token)
        profile.email_verified = True
        profile.save()
        messages.success(request, 'Account Verified Successfully!')
        return render(request, 'accounts/verify.html', {'success': True})
    except UserProfile.DoesNotExist:
        messages.error(request, 'Invalid verification token.')
        return render(request, 'accounts/verify.html', {'success': False})

