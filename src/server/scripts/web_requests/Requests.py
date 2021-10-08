from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import time


class Request:
    def execute(self):
        pass


class LivingCostRequest(Request):

    URL_PREFIX = 'https://www.numbeo.com/cost-of-living/in/'

    # force_country - use only if the city is mistaken with another city in a different country with the same name
    def __init__(self, city, country, webdriver_path, force_country=False):
        # format for get request
        self._city = city
        self._country = country
        self._webdriver_path = webdriver_path

    # e.g. New York to New-York
    @staticmethod
    def _convert_to_url_format(name):
        return "-".join(name.strip().split(' '))

    def _get_summary_by_city_only(self, driver):
        url_city = self._convert_to_url_format(self._city)
        url = self.URL_PREFIX + url_city
        return self._get_summary_by_url(driver, url)

    def _get_summary_by_country_and_city(self, driver):
        url_city_and_country = self._convert_to_url_format(self._city + ' ' + self._country)
        url = self.URL_PREFIX + url_city_and_country
        return self._get_summary_by_url(driver, url)

    @staticmethod
    def _get_summary_by_url(driver, url):
        try:
            driver.get(url)
            time.sleep(0.1)
            result = WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'summary'))
            )
        except Exception as e:
            print(e.__str__())
            result = None
        return result

    @staticmethod
    def _get_single_person_spending_from_summary(summary):
        info_list_element = summary.find_element_by_tag_name('ul')
        single_person_cost = info_list_element.find_elements_by_tag_name('li')[1]
        cost = single_person_cost.find_elements_by_class_name('emp_number')[0].text
        return cost

    def execute(self):
        driver = webdriver.Chrome(self._webdriver_path)
        summary = self._get_summary_by_city_only(driver)
        if summary is None:
            summary = self._get_summary_by_country_and_city(driver)
        return self._get_single_person_spending_from_summary(summary)
