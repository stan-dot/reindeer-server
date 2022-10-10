from forex_python.converter import CurrencyRates


def convert_to_dollars(price, from_curr='GBP'):
    return CurrencyRates().convert(from_curr, 'USD', price)
