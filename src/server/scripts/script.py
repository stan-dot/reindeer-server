from web_requests.Requests import LivingCostRequest, TripAdvisorRequest
"""

Input: country, city, budget, duration, etc.
Output: list of places

"""


def main():
    r = TripAdvisorRequest('New York', 'United States', "/home/wojciech/chromedriver/chromedriver")
    print(r.execute())


if __name__ == "__main__":
    main()
