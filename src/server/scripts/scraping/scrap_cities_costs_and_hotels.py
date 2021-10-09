from web_requests.Requests import LivingCostRequest, TripAdvisorRequest
import json


CITIES_FILE_PATH = '../data/cities.json'
LIVING_COST_FILE_PATH = '../data/livingCost.json'
HOTELS_FILE_PATH = '../data/hotels.json'


def main():
    living_cost_list = []
    hotels_list = []
    with open(CITIES_FILE_PATH, 'r') as f:
        cities_list = json.load(f)
    for city_obj in cities_list:
        city_name = city_obj['city']
        country_name = city_obj['country']
        '''
        living_cost_object = get_living_cost(city_name, country_name, 2)
        if living_cost_object['price'] is not None:
            living_cost_list.append(living_cost_object)
            print(living_cost_object)
        '''
        hotels_object_list = get_hotels(city_name, country_name, 3)
        print(hotels_object_list)
        hotels_list = hotels_list + hotels_object_list
        with open(HOTELS_FILE_PATH, 'w') as f:
            json.dump(hotels_list, f)

    # with open(LIVING_COST_FILE_PATH, 'w') as f:
    #    json.dump(living_cost_list, f)
    print(hotels_list)


def get_hotels(city_name, country_name, patience=1):
    req = TripAdvisorRequest(city_name, country_name, "/home/wojciech/chromedriver/chromedriver")
    attempts = 0
    success = False
    hotels_list = []
    while attempts < patience and (not success):
        try:
            hotels_list = req.execute()
            if hotels_list:
                success = True
        except:
            pass
        finally:
            attempts += 1
    return hotels_list


def get_living_cost(city_name, country_name, patience=1):
    req = LivingCostRequest(city_name, country_name, "/home/wojciech/chromedriver/chromedriver")
    attempts = 0
    success = False
    price = None
    while attempts < patience and (not success):
        try:
            price = req.execute()
            if price is not None:
                success = True
        except:
            pass
        finally:
            attempts += 1

    return {'city': city_name, 'country': country_name, 'price': price}


if __name__ == "__main__":
    main()
