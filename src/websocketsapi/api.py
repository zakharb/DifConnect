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
        Library for WebsocketsAPI

    Author:
        Zakhar Bengart
"""
import asyncio
import json
import websockets
import gzip
import hexdump

# Define a coroutine to handle incoming messages
async def on_message(ws, message):
    print(message)
    # data = json.loads(message)
    # if data['type'] == 'runner':
    #     odds = data['data']['odds']
    #     name = data['data']['name']
    #     print(f"{name}: {odds}")

# Define a coroutine to connect to the WebSocket and send the subscription message
async def connect_websocket():
    # Define the WebSocket URL
    ws_url = 'wss://pushstream.oddschecker.com:443/stream'
    ws_url = 'wss://diffusion.oddschecker.com/diffusion?ty=WB&v=25&ca=8&r=600000&c=%2BsmXB370PSgMxiv3xLG5mLl3&cs=1&ss=436'
    #ws_url = 'wss://socketsbay.com/wss/v2/1/demo/'
    ws_url = 'wss://diffusion.oddschecker.com/diffusion?ty=WB&v=25&ca=8&r=600000&c=oueq2Eox3rIvj0OfcFG6USn0&cs=9&ss=902'
    ws_url = 'wss://diffusion.oddschecker.com/diffusion?ty=WB&v=25&ca=8&r=600000'
    # Define the message to send to start the WebSocket
    #message = json.dumps({'type': 'subscribe', 'data': {'url': '/horse-racing/kempton/19:30/winner'}})
    #'?OC/market_3553154756/?OC/market_3553154756/bet_.*/(OC|non_runner|bookmaker_(B3|SK|PP|WH|EE|FB|VC|CE|UN|SX|FR|RK|BY|OE|DP|SI|LS|QN|WA|LD|N4|RM|VT|TD|BF|MK|MA))'
    headers= {
        "Sec-WebSocket-Version": "13",
        "Sec-WebSocket-Extensions": "permessage-deflate",
        "Sec-WebSocket-Key": "",
        "Sec-Fetch-Dest": "websocket",
        "Sec-Fetch-Mode": "websocket",
        "Sec-Fetch-Site": "same-site",
    }
    #async with websockets.connect(ws_url, extra_headers= headers) as ws:
    async with websockets.connect(ws_url) as ws:
        #await ws.send(message)
        async for message in ws:
            await on_message(ws, message)

# Run the event loop to connect to the WebSocket
def run_socket():
    asyncio.get_event_loop().run_until_complete(connect_websocket())
