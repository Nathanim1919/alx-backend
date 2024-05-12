#!/usr/bin/env python3
"""
Most Recently Used Caching
"""
from collections import OrderedDict
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """Most Recently Used Caching
    """
    def __init__(self):
        """Init
        """
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """Add an item in the cache
        """
        if key is None or item is None:
            return
        if key in self.cache_data:
            self.cache_data.move_to_end(key)
        else:
            if len(self.cache_data) + 1 > BaseCaching.MAX_ITEMS:
                if self.cache_data:
                    last_key, _ = self.cache_data.popitem(False)
                    print("DISCARD: {}".format(last_key))
        self.cache_data[key] = item
        self.cache_data.move_to_end(key)

    def get(self, key):
        """Get an item by key
        """
        if key is None or key not in self.cache_data:
            return None
        self.cache_data.move_to_end(key)
        return self.cache_data[key]
