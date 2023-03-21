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
        Library to work with Diffusion Server
        Subscribe to topic and get data when topic is updated

    Author:
        Zakhar Bengart
"""
import asyncio
import functools
import json
import diffusion

from diffusion.internal.topics import ValueStreamHandler

def on_update(*, old_value: dict, topic_path: str, topic_value: dict, horse_names: dict, **kwargs) -> None:
    """
    A callback function that is executed when a topic value is updated. It prints the updated topic value with the horse
    name added to it, if the topic value includes an 'ocBetId' key that matches a horse ID in the horse_names dictionary.

    Args:
        old_value (dict): The previous value of the topic.
        topic_path (str): The path of the topic that has been updated.
        topic_value (dict): The new value of the topic.
        horse_names (dict): A dictionary containing the horse names, with the horse's bid as the key and the horse's name
                            as the value.
    """
    if 'ocBetId' in topic_value:
        horse_id = str(topic_value['ocBetId'])
        if horse_id in horse_names:
            topic_value['horse_name'] = horse_names[horse_id]
            json_data = json.dumps(
                topic_value, indent=4, sort_keys=True, default=str)
            print(json_data)

def on_subscribe(*, topic_path: str, **kwargs) -> None:
    """
    A callback function that is executed when a subscriber is successfully subscribed to a topic. It prints a message
    indicating which topic the subscriber has been subscribed to.

    Args:
        topic_path (str): The path of the topic that the subscriber has been subscribed to.
    """
    print(f"You have been subscribed to {topic_path}")

def on_unsubscribe(*, reason: str, topic_path: str, **kwargs) -> None:
    """
    A callback function that is executed when a subscriber is unsubscribed from a topic. It prints a message indicating
    which topic the subscriber has been unsubscribed from and the reason for the unsubscribe.

    Args:
        reason (str): The reason for the unsubscribe.
        topic_path (str): The path of the topic that the subscriber has been unsubscribed from.
    """
    print(f"You have been unsubscribed from {topic_path} because {reason}")


async def run_server(url: str, horse_names: dict, topic_path: str, sleep_time: int = 3600) -> None:
    """
    An async function that connects to a Diffusion server, subscribes to a topic, and runs indefinitely with a sleep time
    between each iteration. When the topic is updated, it calls the on_update() function to print the updated topic value
    with the horse name added to it, if applicable.

    Args:
        url (str): The URL of the Diffusion server to connect to.
        horse_names (dict): A dictionary containing the horse names, with the horse's bid as the key and the horse's name
                            as the value.
        topic_path (str): The path of the topic to subscribe to.
        sleep_time (int, optional): The number of seconds to wait between each iteration. Defaults to 3600.
    """
    async with diffusion.Session(url, principal=None, credentials=None) as session:
        value_stream = ValueStreamHandler(
            data_type=diffusion.datatypes.JSON,
            update=functools.partial(on_update, horse_names=horse_names),
            subscribe=on_subscribe,
            unsubscribe=on_unsubscribe,
        )
        session.topics.add_value_stream(
            topic_selector=topic_path, stream=value_stream
        )
        await session.topics.subscribe(topic_path)
        await asyncio.sleep(sleep_time)
