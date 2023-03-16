"""
    WebsocketsAPI
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
        Service to work with async websockets

    Author:
        Zakhar Bengart
"""
import os
import argparse
from api import run_socket

def create_parser():
    parser = argparse.ArgumentParser(
        prog='main', 
        usage='%(prog)s [options]')
    subparser = parser.add_subparsers(dest='command')
    get = subparser.add_parser('get', help='Get information from Websockets API')
    get.add_argument('--url', type=str, help='URL from where get information')
    return parser

def main():
    parser = create_parser()
    args = parser.parse_args()
    if args.command == 'get':
        run_socket()
    else:
        print("Not enough arguments, '--help' for more info")

if __name__ == "__main__":
    main()