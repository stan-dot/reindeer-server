import json


class Hotel:
    def __init__(self, city, link, price):
        self._city = city,
        self._link = link,
        self._price = price

    def get_stay_price(self, days):
        return days * self._price

    def get_dict(self):
        return {
            'city': self._city.name,
            'link': self._link,
            'price': self._price
        }


class City:
    def __init__(self, name, country, living_cost):
        self._name = name
        self._country = country
        self._month_living_cost = living_cost

    def get_stay_price(self, days):
        return self._month_living_cost * days / 30

    def get_dict(self):
        return {
            'city': self._name,
            'country': self._country,
            'price': self._month_living_cost
        }


class Trip:
    def __init__(self, city, hotel):
        self._city = city
        self._hotel = hotel

    def get_stay_price(self, days):
        return self._city.get_stay_price(days) + self._hotel.get_stay_price(days)

    def get_dict(self):
        return {
            'city': self._city.get_dict(),
            'hotel': self._hotel.get_dict()
        }


class JsonRepository:
    _objects_list = []

    def load_from_json(self, f_name):
        with open(f_name, 'r') as f:
            self._objects_list = json.load(f)

    def find_by(self, predicate):
        hotels = []
        for h in self._objects_list:
            if predicate(h):
                hotels.append(h)
        return hotels

    def find_all(self):
        return self._objects_list
