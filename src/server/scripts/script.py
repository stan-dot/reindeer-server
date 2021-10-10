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


MAX_OFFER_LEN = 10

# example input {\"city\": \"New York\",\"budget\": 1700,\"currency\": \"GBP\",\"days\": 1,\"people\": 1}


def main():
    # json_str = " ".join(sys.argv[1:])
    json_data = json.loads(sys.argv[1])
    # json_data = json.loads(json_str)
    city_name = json_data["city"]
    currency_symbol = json_data["currency"]
    budget = json_data["budget"]
    days = json_data["days"]
    n_people = json_data["people"]
    if currency_symbol != "USD":
        dollar_budget = convert_to_dollars(budget, currency_symbol)
    else:
        dollar_budget = budget
    if city_name == "":
        trips = best_trips_all_cities(dollar_budget, days, n_people)
    else:
        trips = best_trips(city_name, dollar_budget, days, n_people)
    offer_len = min(len(trips), MAX_OFFER_LEN)
    print(json.dumps(trips[:offer_len]))


if __name__ == "__main__":
    main()
