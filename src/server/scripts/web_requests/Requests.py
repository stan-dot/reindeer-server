from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import StaleElementReferenceException, TimeoutException
from selenium.webdriver.chrome.options import Options
import time
import urllib3


IMAGES_DIR = '../data/images/'


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
        if summary is None:
            return None
        cost = self._get_single_person_spending_from_summary(summary)
        driver.close()
        return cost


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
                raise Exception('Could not click on the hotels.json list')
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
        chrome_opt = Options()
        chrome_opt.add_argument("--headless")
        driver = webdriver.Chrome(self._webdriver_path, options=chrome_opt)
        hotels_list = self._get_hotels_list(self._city, self._country, driver)
        hotels_dict_list = []
        for city, link, price in hotels_list:
            if price != -1:
                hotels_dict_list.append({'city': city, 'link': link, 'price': price})
        driver.close()
        return hotels_dict_list


class GoogleImageRequest(Request):
    _INITIAL_URL = 'https://www.google.com/search?q=edinburgh&sxsrf=AOaemvL01nzfbMMUfg5C41NmqQoTYxC_lQ:1633776993965&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiq2_fKlb3zAhWDgVwKHXjuBl8Q_AUoAnoECAEQBA&biw=1920&bih=787&dpr=1'

    def __init__(self, city, country, webdriver_path, n_images=1):
        self._webdriver_path = webdriver_path
        self._city = city
        self._country = country
        self._n_images = n_images

    def _get_images(self, driver):
        mapping_objects = []
        driver.get(self._INITIAL_URL)
        try:
            search_input = WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'input[class=og3lId]'))
            )
            search_input.clear()
            search_input.send_keys(self._city + ', ' + self._country)
            search_input.send_keys(Keys.RETURN)
            time.sleep(0.5)
            images_panel = WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'div[class=islrc]'))
            )
            images = images_panel.find_elements_by_tag_name('img')[:self._n_images]
            f_names = self._download_images(images)
            for f_name in f_names:
                mapping_objects.append({'city': self._city, 'country': self._country, 'file': f_name})

        except TimeoutException as e:
            print("Searching for " + self._city + " timed out")
        finally:
            return mapping_objects

    def _download_images(self, images):
        f_names = []
        for i, im in enumerate(images):
            image = im.screenshot_as_png
            f_name = self._city + str(i) + '.png'
            with open(IMAGES_DIR + f_name, 'wb') as f:
                f.write(image)
                f_names.append(f_name)
        return f_names

    def execute(self):
        chrome_opt = Options()
        chrome_opt.add_argument("--headless")
        driver = webdriver.Chrome(self._webdriver_path, options=chrome_opt)
        image_map = self._get_images(driver)
        driver.close()
        return image_map
