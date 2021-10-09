from web_requests.Requests import LivingCostRequest, TripAdvisorRequest, GoogleImageRequest
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
    print(json.dumps(send_message_back))
    r = GoogleImageRequest(
        "Edinburgh", "United Kingdom", "/home/wojciech/chromedriver/chromedriver", 3
    )
    print(r.execute())


if __name__ == "__main__":
    main()
