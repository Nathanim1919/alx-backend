#!/usr/bin/env python3
"""
LIFO caching
"""
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """LIFO Caching"""
    def __init__(self):
        super().__init__()

    def put(self, key, item):
        """Put an item with key of key"""
        if key is None or item is None:
            return
        if key and item:
            self.cache_data[key] = item
            if len(self.cache_data) > self.MAX_ITEMS:
                last = list(self.cache_data.keys())[-1]
                print("DISCARD: {}".format(last))
                del self.cache_data[last]

    def get(self, key):
        """Get an item with key of key"""
        if key is None or self.cache_data.get(key) is None:
            return None
        return self.cache_data.get(key)
