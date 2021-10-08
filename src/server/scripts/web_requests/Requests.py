from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import StaleElementReferenceException, TimeoutException
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


class TripAdvisorRequest(Request):

    HOME_PAGE_URL = 'https://www.tripadvisor.co.uk/'

    def __init__(self, city, country, webdriver_path):
        self._city = city
        self._country = country
        self._webdriver_path = webdriver_path

    def _get_hotels_list(self, city, country, driver):
        url = self.HOME_PAGE_URL + '/Search?q=' + self._city
        driver.get(url)
        self._consent_cookies(driver)
        hotels_list = []
        try:
            site_type_panel = WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.ID, 'search-filters'))
            )
            if not self._click_on_hotels_link(driver, site_type_panel):
                raise Exception('Could not click on the hotels list')
            WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'result-title'))
            )
            hotels_divs = driver.find_elements_by_class_name('result-title')
            for h_div in hotels_divs:
                hotels_list.append(self._get_hotel_info(driver, h_div))
        except Exception as e:
            print("_get_hotels_list: " + e.__str__())
        return hotels_list

    def _get_hotel_info(self, driver, hotel_div):
        hotel_div.click()
        time.sleep(1)
        driver.switch_to.window(driver.window_handles[1])
        hotel_url = driver.current_url
        try:
            price_el = WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'fzleB'))
            )
            price = price_el.text
        except TimeoutException as e:
            print("_get_hotel_info: " + e.__str__())
            price = -1
        finally:
            driver.close()
            driver.switch_to.window(driver.window_handles[0])
            return self._city, hotel_url, price

    @staticmethod
    def _click_on_hotels_link(driver, site_type_panel):
        click_patience = 10
        start = time.time()
        clicked = False
        while time.time() - start <= click_patience and (not clicked):
            try:
                site_type_panel = driver.find_element_by_id('search-filters')
                hotels_ul = site_type_panel.find_elements_by_tag_name('ul')[0]
                hotels_li = hotels_ul.find_elements_by_tag_name('li')[1]
                hotels_a = hotels_li.find_elements_by_tag_name('a')[0]
                hotels_a.click()
                clicked = True
            except StaleElementReferenceException as e:
                pass
        return clicked

    @staticmethod
    def _consent_cookies(driver):
        try:
            cookie_consent_button = WebDriverWait(driver, 2).until(
                EC.presence_of_element_located((By.ID, '_evidon-accept-button'))
            )
            cookie_consent_button.send_keys(Keys.RETURN)
        except Exception as e:
            print(e.__str__())

    def execute(self):
        driver = webdriver.Chrome(self._webdriver_path)
        hotels_list = self._get_hotels_list(self._city, self._country, driver)
        hotels_dict_list = []
        for city, link, price in hotels_list:
            if price != -1:
                hotels_dict_list.append({'city': city, 'link': link, 'price': price})
        return hotels_dict_list
