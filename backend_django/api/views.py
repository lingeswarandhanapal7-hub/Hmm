import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import (
    HmmUser,
    SimplifiedDocument,
    create_user_account,
    authenticate_user_credentials,
    record_simplified_document
)

@csrf_exempt
@require_http_methods(["GET"])
def health_check(request):
    """
    Function-based view for server and MySQL health status
    """
    try:
        user_count = HmmUser.objects.count()
        doc_count = SimplifiedDocument.objects.count()
        db_status = {
            'connected': True,
            'engine': 'django.db.backends.mysql',
            'database': 'hmm_db',
            'users_count': user_count,
            'documents_count': doc_count
        }
    except Exception as e:
        db_status = {
            'connected': False,
            'error': str(e)
        }

    return JsonResponse({
        'status': 'online',
        'framework': 'Django 5.1 (Function-Based Views)',
        'database': db_status
    })


@csrf_exempt
@require_http_methods(["POST"])
def signup_view(request):
    """
    Function-based view for User Registration in MySQL
    """
    try:
        data = json.loads(request.body.decode('utf-8'))
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        if not name or not email or not password:
            return JsonResponse({'success': False, 'error': 'Name, email, and password are required.'}, status=400)

        user = create_user_account(name, email, password)
        return JsonResponse({
            'success': True,
            'user': user.to_dict(),
            'message': 'Account created successfully in MySQL via Django.'
        })
    except ValueError as ve:
        return JsonResponse({'success': False, 'error': str(ve)}, status=409)
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def login_view(request):
    """
    Function-based view for User Authentication against MySQL
    """
    try:
        data = json.loads(request.body.decode('utf-8'))
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return JsonResponse({'success': False, 'error': 'Email and password are required.'}, status=400)

        user = authenticate_user_credentials(email, password)
        return JsonResponse({
            'success': True,
            'user': user.to_dict(),
            'message': 'Logged in successfully via Django.'
        })
    except PermissionError as pe:
        return JsonResponse({'success': False, 'error': str(pe)}, status=401)
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)


@csrf_exempt
@require_http_methods(["GET"])
def document_history_view(request):
    """
    Function-based view to fetch a user's simplified document records from MySQL
    """
    user_id = request.GET.get('userId')
    if not user_id:
        return JsonResponse({'success': False, 'error': 'userId query parameter is required.'}, status=400)

    docs = SimplifiedDocument.objects.filter(user_id=user_id)[:20]
    return JsonResponse({
        'success': True,
        'count': docs.count(),
        'documents': [d.to_dict() for d in docs]
    })


@csrf_exempt
@require_http_methods(["POST"])
def process_document_view(request):
    """
    Function-based view to log and simplify documents
    """
    user_id = request.POST.get('userId')
    language = request.POST.get('language', 'en')
    uploaded_file = request.FILES.get('image')

    filename = uploaded_file.name if uploaded_file else 'uploaded_document.jpg'

    # Record document entry in MySQL
    doc = record_simplified_document(
        user_id=int(user_id) if user_id else None,
        filename=filename,
        document_type='official_document',
        language=language,
        summary='Document recorded and processed successfully via Django backend.',
        keyFacts=[{'label': 'Status', 'value': 'Recorded in MySQL'}],
        nextSteps=[{'step': 1, 'text': 'Review details with issuing authority'}],
        urgency='Notice'
    )

    return JsonResponse({
        'success': True,
        'document': doc.to_dict()
    })
