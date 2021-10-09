import json
import pandas as pd
import math
from tqdm import tqdm

HOTELS_JSON_PATH = 'data/dollarHotels.json'
LIVING_COST_PATH = 'data/dollarLivingCost.json'


def best_trips(dollar_budget, days, n_people, n_offers=10):
    affordable_cities = pd.DataFrame()
    with open(LIVING_COST_PATH, 'r') as f:
        all_cities = json.load(f)
    with open(HOTELS_JSON_PATH, 'r') as f:
        all_hotels = json.load(f)
    living_cost_coeff = n_people * days / 30
    affordable_cities['city'] = [city['city'] for city in all_cities if city['price'] * living_cost_coeff
                                 < dollar_budget]
    affordable_cities['country'] = [city['country'] for city in all_cities if city['price'] * living_cost_coeff
                                    < dollar_budget]
    affordable_cities['max_hotel_price'] = [dollar_budget - city['price'] * living_cost_coeff
                                            for city in all_cities if city['price'] * living_cost_coeff
                                            < dollar_budget]
    trips = get_trip_offers(affordable_cities, all_hotels, days, n_people)

    return trips


def get_trip_offers(affordable_cities, all_hotels, days, n_people):
    n_rooms = math.ceil(n_people / 2)
    trips = []
    for city, max_hotel_price in tqdm(affordable_cities[['city', 'max_hotel_price']].to_numpy()):
        max_hotel_price_per_day = max_hotel_price / (n_rooms * days)
        affordable_hotels = [hotel for hotel in all_hotels if
                             hotel['price'] <= max_hotel_price_per_day and hotel['city'] == city]
        for h in affordable_hotels:
            trips.append({
                'city': city,
                'hotel': h
            })
    return trips
