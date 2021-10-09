from web_requests.Requests import LivingCostRequest, TripAdvisorRequest, GoogleImageRequest
from trip_selector.candidate_trips_selector import best_trips, best_trips_all_cities
from data_preprocessing.currency_convert import convert_to_dollars
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
    json_data = json.loads(" ".join(sys.argv[1:]))
    city_name = json_data['city']
    currency_symbol = json_data['currency']
    budget = json_data['budget']
    days = json_data['days']
    n_people = json_data['people']
    if currency_symbol is not 'USD':
        dollar_budget = convert_to_dollars(budget, currency_symbol)
    else:
        dollar_budget = budget
    if city_name == '':
        trips = best_trips('London', dollar_budget, 1, 1)
    else:
        trips = best_trips_all_cities(dollar_budget, days, n_people)
    print(json.dump(trips))


if __name__ == "__main__":
    main()
