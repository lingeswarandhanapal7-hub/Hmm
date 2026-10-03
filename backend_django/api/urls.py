from django.urls import path
from .views import (
    health_check,
    signup_view,
    login_view,
    document_history_view,
    process_document_view
)

urlpatterns = [
    path('health/', health_check, name='api_health'),
    path('auth/signup/', signup_view, name='api_signup'),
    path('auth/login/', login_view, name='api_login'),
    path('documents/history/', document_history_view, name='api_document_history'),
    path('process-document/', process_document_view, name='api_process_document'),
]
