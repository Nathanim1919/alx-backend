#!/usr/bin/python3
"""FIFO caching"""

from base_caching import BaseCaching


class FIFOCache(BaseCaching):

    def __init__(self):
        super().__init__()

    def put(self, key, item):
        """add an item in the cache"""
        if key is None or item is None:
            return
        if (len(self.cache_data) > self.MAX_ITEMS):
            first_key = next(iter(self.cache_data))
            del self.cache_data[first_key]
            print("DISCARD: {}".format(first_key))
        self.cache_data[key] = item

    def get(self, key):
        """Get an item by key"""
        if key is None or self.cache_data.get(key) is None:
            return None
        return self.cache_data.get(key)
