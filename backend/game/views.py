import random
import json
from django.http import JsonResponse

def play_game(request):
    # Only allow POST
    if request.method == "POST":
        data = json.loads(request.body)

        p1 = int(data["p1"])
        p2 = int(data["p2"])

        number = random.randint(0, 99)

        return JsonResponse({
            "number": number,
            "p1win": p1 == number,
            "p2win": p2 == number
        })

    # If someone visits in browser (GET)
    return JsonResponse({"error": "Use POST request"})