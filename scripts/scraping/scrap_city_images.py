from web_requests.Requests import GoogleImageRequest
import json


CITIES_FILE_PATH = '../data/cities.json'
IMAGES_MAP_PATH = '../data/images_map.json'


def main():
    images_list = []
    with open(CITIES_FILE_PATH, 'r') as f:
        cities_list = json.load(f)
    for city_obj in cities_list:
        city_name = city_obj['city']
        country_name = city_obj['country']
        req = GoogleImageRequest(city_name, country_name, "/home/wojciech/chromedriver/chromedriver", 3)
        city_images_map_list = req.execute()
        images_list = images_list + city_images_map_list
        print(city_images_map_list)
        with open(IMAGES_MAP_PATH, 'w') as f:
            json.dump(images_list, f)


if __name__ == "__main__":
    main()

