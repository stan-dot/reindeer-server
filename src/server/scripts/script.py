from web_requests.Requests import LivingCostRequest, TripAdvisorRequest, GoogleImageRequest
from trip_selector.candidate_trips_selector import best_trips
import sys
import json

"""
Input: country, city, budget, duration, etc.
Output: list of places
"""
send_message_back = {
    "arguments": sys.argv[1:],
    "message": """Hello,
This is my message.

To the world""",
}


def main():
    print(best_trips('Vienna', 10000, 2, 1))
    print(json.dumps(send_message_back))


if __name__ == "__main__":
    main()
