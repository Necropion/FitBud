from django.http import JsonResponse

def function(request):
    return JsonResponse({"status": "working"})