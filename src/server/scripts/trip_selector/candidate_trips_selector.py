import json
import pandas as pd

HOTELS_JSON_PATH = '../data/dollarHotels.json'
LIVING_COST_PATH = '../data/dollarLivingCost.json'


def best_trips(dollar_budget, days, n_offers=10):
    affordable_cities = pd.DataFrame()
    with open(LIVING_COST_PATH, 'r') as f:
        all_cities = json.load(f)
    affordable_cities['city'] = [city for city in all_cities if city['price'] < dollar_budget]
    affordable_cities['max_hotel_spend'] = [dollar_budget - city['price']
                                            for city in all_cities if city['price'] < dollar_budget]
    print(affordable_cities)