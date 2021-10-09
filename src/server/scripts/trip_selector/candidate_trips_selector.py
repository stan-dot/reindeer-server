import json
import pandas as pd
import math
from tqdm import tqdm
from model.trip_logic import JsonRepository

HOTELS_JSON_PATH = 'data/dollarHotels.json'
LIVING_COST_PATH = 'data/dollarLivingCost.json'


def best_trips(city_name, dollar_budget, days, n_people, n_offers=10):
    all_cities = JsonRepository()
    all_cities.load_from_json(LIVING_COST_PATH)
    all_hotels = JsonRepository()
    all_hotels.load_from_json(HOTELS_JSON_PATH)
    current_city = all_cities.find_by(lambda x: x['city'] == city_name)
    if not current_city:
        return []
    city_name = current_city[0]['city']
    living_cost = current_city[0]['price'] * n_people * days
    if living_cost >= dollar_budget:
        return []
    hotel_budget = dollar_budget - living_cost
    n_rooms = math.ceil(n_people / 2)
    max_hotel_price = hotel_budget / (n_rooms * days)
    return sorted(get_trips(all_hotels, days, living_cost, n_rooms, city_name, max_hotel_price),
                  key=lambda x: x['total cost'])


def best_trips_all_cities(dollar_budget, days, n_people, n_offers=10):
    all_cities = JsonRepository()
    all_cities.load_from_json(LIVING_COST_PATH)
    trips = []
    for city in all_cities.find_all():
        city_name = city['city']
        trips += best_trips(city_name, dollar_budget, days, n_people, n_offers)
    return sorted(trips, key=lambda x: x['total cost'])


def get_trips(all_hotels, days, living_cost, n_rooms, city_name, max_hotel_price):
    hotels = all_hotels.find_by(lambda x: x['city'] == city_name and x['price'] <= max_hotel_price)
    trips = []
    for h in hotels:
        trip_cost = h['price'] * n_rooms * days + living_cost
        trips.append({'city': h['city'], 'link': h['link'], 'total cost': trip_cost * 100 // 100})
    return trips
