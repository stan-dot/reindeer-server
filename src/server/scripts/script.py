from web_requests.Requests import LivingCostRequest
"""

Input: country, city, budget, duration, etc.
Output: list of places

"""


def main():
    r = LivingCostRequest('New York', 'United States', "/home/wojciech/chromedriver/chromedriver")
    print(r.execute())


if __name__ == "__main__":
    main()
