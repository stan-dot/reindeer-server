import pandas as pd
import json


def main():
    cities_df = pd.read_csv('concap.csv')
    cities_df.dropna(inplace=True)
    cities_dict_list = []
    for capital_city, country in cities_df[['CapitalName', 'CountryName']].to_numpy():
        cities_dict_list.append({'capitalName': capital_city, 'country': country})

    with open('../data/capital_cities.json', 'w') as fp:
        json.dump(cities_dict_list, fp)


if __name__ == "__main__":
    main()
