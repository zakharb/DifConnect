"""
    DiffusionConnect
    Copyright (C) 2023 Zakhar Bengart

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

    Description:
        Library to scrape data from website 
        Using cloudscraper for prevent blocking by Captcha

    Author:
        Zakhar Bengart
"""
from bs4 import BeautifulSoup
import cloudscraper 
 
def scrape_url(url):
    """
    Scrapes the content of a given URL using cloudscraper and returns it as a BeautifulSoup object.

    Args:
        url (str): The URL to be scraped.

    Returns:
        BeautifulSoup object: The scraped content of the URL as a BeautifulSoup object.
    """
    scraper = cloudscraper.create_scraper(delay=10, browser="chrome") 
    content = scraper.get(url).text 
    return BeautifulSoup(content, 'html.parser')
        
def find_topic_path(soup: BeautifulSoup, bookmakers: str) -> str:
    """
    Finds the topic ID in a BeautifulSoup object and returns a formatted string representing the topic path.

    Args:
        soup (BeautifulSoup object): The BeautifulSoup object containing the HTML content to be searched.
        bookmakers (str): A string containing the names of the bookmakers to be included in the topic path.

    Returns:
        str: A formatted string representing the topic path. The bookmaker names passed in as an argument are included in
             the path.
    """
    table = soup.find('table', {'id': 'ew_bookie_content'})
    if not table:
        return None
    topic_id = table.get('data-mid')
    return f"?OC/market_{topic_id}/bet_.*/(OC|non_runner|bookmaker_({bookmakers}))"

def find_horse_names(soup: BeautifulSoup) -> dict:
    """
    Finds the names of the horses in a BeautifulSoup object and returns them as a dictionary.

    Args:
        soup (BeautifulSoup object): The BeautifulSoup object containing the HTML content to be searched.

    Returns:
        dict: A dictionary containing the horse names, with the horse's bid as the key and the horse's name as the value.
    """
    horses = {}
    rows = soup.find_all(class_='diff-row evTabRow bc')
    for row in rows:
        bid = row.get('data-bid')
        horse_name = row.get('data-bname')
        horses[bid] = horse_name
    return horses
