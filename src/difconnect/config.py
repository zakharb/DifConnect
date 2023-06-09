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
        Config for DifConnect

    Author:
        Zakhar Bengart
"""
import os 

SERVER_URL = os.getenv("SERVER_URL", "")
BOOKMAKERS = os.getenv("BOOKMAKERS", "")
RACE_URL = os.getenv('RACE_URL', "")
