import pandas as pd
import json
from currency_convert import convert_to_dollars


RAW_HOTEL_JSON_PATH = '../data/hotels.json'
DOLLAR_HOTEL_JSON_PATH = '../data/dollarHotels.json'


def main():
    hotels_df = pd.DataFrame()
    with open(RAW_HOTEL_JSON_PATH, 'r') as f:
        hotels_list = json.load(f)
    hotels_df['city'] = [obj['city'] for obj in hotels_list]
    hotels_df['link'] = [obj['link'] for obj in hotels_list]
    hotels_df['price'] = [obj['price'] for obj in hotels_list]
    hotels_df['dollar_price'] = hotels_df['price'].apply(lambda pr: convert_to_dollars(float(pr[1:].replace(',', ''))))
    dollar_hotel_list = []
    for city, link, dollar_price in hotels_df[['city', 'link', 'dollar_price']].to_numpy():
        dollar_hotel_list.append({'city': city, 'link': link, 'price': dollar_price})
    with open(DOLLAR_HOTEL_JSON_PATH, 'w') as f:
        json.dump(dollar_hotel_list, f)


if __name__ == "__main__":
    main()
