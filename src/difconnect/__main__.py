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
        Service to work with Diffusion Server

    Author:
        Zakhar Bengart
"""
import os
import argparse
import asyncio
from time import sleep

from difconnect.scraper import scrape_url, find_topic_path, find_horse_names
from difconnect.dif import run_server
from difconnect.config import SERVER_URL, BOOKMAKERS, RACE_URL

def print_logo():
    print("""
 ___   _   ____  __    ___   _      _      ____  __   _____ 
| | \ | | | |_  / /`  / / \ | |\ | | |\ | | |_  / /`   | |  
|_|_/ |_| |_|   \_\_, \_\_/ |_| \| |_| \| |_|__ \_\_,  |_|  

    """)                                                                           

def create_parser():
    parser = argparse.ArgumentParser(
        prog='main', 
        usage='%(prog)s [options]')
    subparser = parser.add_subparsers(dest='command')
    get = subparser.add_parser('get', help='Get information from Websockets API')
    get.add_argument('--url', type=str, help='URL from where get information')
    return parser

if __name__ == "__main__":
    print_logo()
    parser = create_parser()
    args = parser.parse_args()
    if args.command == 'get':
        topic_path = ""
        horse_names = ""
        while not horse_names or not topic_path:
            if args.url:
                race_url = args.url
            else:
                race_url = RACE_URL
            soup = scrape_url(race_url)
            topic_path = find_topic_path(soup, BOOKMAKERS)
            print(f'[+] Found topic_path: {topic_path}')
            horse_names = find_horse_names(soup)
            print(f'[+] Found horse_names: {horse_names}')
            if not topic_path or not horse_names:
                print('[-] Can not scrape data, trying one more time...')
                sleep(1)
        print('[*] Starting dif server to retrieve data')
        asyncio.run(run_server(SERVER_URL, horse_names, topic_path))
    else:
        print("Not enough arguments, '--help' for more info")