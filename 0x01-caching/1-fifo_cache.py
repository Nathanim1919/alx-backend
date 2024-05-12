#!/usr/bin/python3
"""FIFO caching"""

from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """FIFO caching"""

    def __init__(self):
        """Init"""
        super().__init__()

    def put(self, key, item):
        """Add an item in the cache"""
        if key is None or item is None:
            return
        if key and item:
            self.cache_data[key] = item
            if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                discard = list(self.cache_data.keys())[0]
                print("DISCARD: {}".format(discard))
                del self.cache_data[discard]

    def get(self, key):
        """Get an item by key"""
        if key is None or self.cache_data.get(key) is None:
            return None
        return self.cache_data.get(key)
