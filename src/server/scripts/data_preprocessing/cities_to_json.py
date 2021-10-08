import pandas as pd
import json


def main():
    cities_df = pd.read_csv('HackeRam2021 - Cities.csv')
    cities_dict_list = []
    for city, country in cities_df[['City', 'Country']].to_numpy():
        cities_dict_list.append({'city': city, 'country': country})

    with open('../data/cities.json', 'w') as fp:
        json.dump(cities_dict_list, fp)


if __name__ == "__main__":
    main()