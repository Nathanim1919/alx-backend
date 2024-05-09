# Pagination And Filtering


## Filtering
  
Filtering in REST API refers to the process of limiting the result set of an API request based on specific criteria.

example:
`GET /items?price=20-60`



### Filtering methods
1. Path parameters
 - In a REST API, path parameters can be used to filter data by encoding the filtering conditions as part of the URL path.

 example:
 `GET /products/category/{category}`

2. Query Parameters
  - It filters data based on specific query parameter values. These parameters are added to the URL after a ? and separated by &. The value of the query parameter is used to filter data.

  example:
  `GET /products?price_gt=50`

3. Request Body
 ```POST /books/filter
    Content-Type: application/json

    {
        "author": "Jane Austen",
        "year": 1813,
        "rating": 4
    }
```



## Pagination

- Most endpoints that returns a list of entities will need to have some sort of pagination.

- Without pagination, a simple search could return millions or even billions of hits causing extraneous network traffic.

### Offset Pagination
- Limit/Offset Paging would look like `GET /items?limit=20&offset=100.` This query would return the 20 rows starting with the 100th row.


### Keyset Pagination
- Keyset pagination uses the filter values of the last page to fetch the next set of items. Those columns would be indexed.



### Seek Pagination
- Seek Paging is an extension of Keyset paging. By adding an after_id or start_id URL parameter.


## Sorting


