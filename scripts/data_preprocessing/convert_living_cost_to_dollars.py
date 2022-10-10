import pandas as pd
import json
from currency_convert import convert_to_dollars


RAW_LIVING_COST_JSON_PATH = '../data/livingCost.json'
DOLLAR_LIVING_COST_JSON_PATH = '../data/dollarLivingCost.json'


def main():
    with open(RAW_LIVING_COST_JSON_PATH, 'r') as f:
        living_cost_list = json.load(f)
    living_cost_df = pd.DataFrame()
    living_cost_df['city'] = [obj['city'] for obj in living_cost_list]
    living_cost_df['country'] = [obj['country'] for obj in living_cost_list]
    living_cost_df['cost'] = [obj['price'].split('£')[0].replace(',', '') for obj in living_cost_list]
    living_cost_df['dollar_cost'] = living_cost_df['cost'].apply(lambda pr: convert_to_dollars(float(pr)))
    dollar_living_cost_list = []
    for city, country, price in living_cost_df[['city', 'country', 'dollar_cost']].to_numpy():
        dollar_living_cost_list.append({'city': city, 'country': country, 'price': price})
    with open(DOLLAR_LIVING_COST_JSON_PATH, 'w') as f:
        json.dump(dollar_living_cost_list, f)


if __name__ == "__main__":
    main()
