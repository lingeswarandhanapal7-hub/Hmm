from django.db import models
from django.contrib.auth.hashers import make_password, check_password
import json

class HmmUser(models.Model):
    """
    User Account model stored in MySQL
    """
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True, max_length=255)
    password_hash = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'django_users'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.email})"

    def set_password(self, raw_password):
        self.password_hash = make_password(raw_password)

    def verify_password(self, raw_password):
        return check_password(raw_password, self.password_hash)

    def get_initials(self):
        parts = self.name.strip().split()
        if len(parts) == 1:
            return parts[0][:2].upper()
        return (parts[0][0] + parts[-1][0]).upper()

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'initials': self.get_initials(),
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class SimplifiedDocument(models.Model):
    """
    Simplified Document and AI analysis record stored in MySQL
    """
    user = models.ForeignKey(HmmUser, on_delete=models.SET_NULL, null=True, blank=True, related_name='documents')
    filename = models.CharField(max_length=255)
    document_type = models.CharField(max_length=100, default='general')
    language = models.CharField(max_length=10)
    summary = models.TextField()
    key_facts = models.JSONField(default=list, blank=True)
    next_steps = models.JSONField(default=list, blank=True)
    urgency = models.CharField(max_length=50, default='Notice')
    grounded_reference = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'django_documents'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.filename} ({self.document_type} - {self.language})"

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'filename': self.filename,
            'document_type': self.document_type,
            'language': self.language,
            'summary': self.summary,
            'key_facts': self.key_facts,
            'next_steps': self.next_steps,
            'urgency': self.urgency,
            'grounded_reference': self.grounded_reference,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


# =========================================================================
# Function-Based Helpers for Model Operations
# =========================================================================

def create_user_account(name: str, email: str, raw_password: str) -> HmmUser:
    """Function-based helper to create and hash a user in MySQL"""
    clean_email = email.strip().lower()
    if HmmUser.objects.filter(email=clean_email).exists():
        raise ValueError("An account with this email address already exists.")

    user = HmmUser(name=name.strip(), email=clean_email)
    user.set_password(raw_password)
    user.save()
    return user


def authenticate_user_credentials(email: str, raw_password: str) -> HmmUser:
    """Function-based helper to authenticate user against MySQL"""
    clean_email = email.strip().lower()
    try:
        user = HmmUser.objects.get(email=clean_email)
    except HmmUser.DoesNotExist:
        raise PermissionError("Invalid email or password.")

    if not user.verify_password(raw_password):
        raise PermissionError("Invalid email or password.")

    return user


def record_simplified_document(user_id=None, filename='document.jpg', document_type='general',
                               language='en', summary='', key_facts=None, next_steps=None,
                               urgency='Notice', grounded_reference='') -> SimplifiedDocument:
    """Function-based helper to store document result in MySQL"""
    user = None
    if user_id:
        try:
            user = HmmUser.objects.get(id=user_id)
        except HmmUser.DoesNotExist:
            user = None

    doc = SimplifiedDocument.objects.create(
        user=user,
        filename=filename,
        document_type=document_type,
        language=language,
        summary=summary,
        key_facts=key_facts or [],
        next_steps=next_steps or [],
        urgency=urgency,
        grounded_reference=grounded_reference
    )
    return doc
