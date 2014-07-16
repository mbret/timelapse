Node API Skeleton
=================

Simple api skeleton using node.js. This RESTful api is based on REST and use then as much as possible HTTP standard and info to treat a request and provide a response. The api call are based on HTTP verbose and url definition.

This applicaiton is a basic but ready to use skeleton. It use a mysql database and implement the minimal requirement for production's release.

This application is based on these convention/best practices:
* API is based on snake_case.
* All 400 and 500 HTTP status series comes with error response.
* http://labs.omniti.com/labs/jsend.
* http://www.nielskrijger.com/2013/08/rest-and-json-api-guidelines-and-best.html.
* http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api.

What is provided and implemented by the skeleton
------------------------------------------------
* Logging of request traffic and application logging.
* Separate config files and server management.
* Separate and structurated routes system.
* Allow customer to retrieve only some information (with field parameter) to limite bandwith utilisation.
* Use SSL.
* Accept POST (only) request with X-HTTP-Method-Override to customer that are only working with GET/POST.

Here are the current supported api call
---------------------------------------
| Resource	  | GET | POST | PUT | DELETE | PATCH |
| ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
| /products  | Get the list of products  | Add a new product | Update multiple products | Delete all products | - |
| /products/:id  | Get a product based on id  | - | Update a product based on id | Delete a product based on id | - |
| /products/random  | Get a random product  | - | - | - | - |
| /products/:id/components  | Get all components of product :id  | Add new component to the product :id | Update multiple components of the product :id | Delete all components of the product :id | - |
| /products/:id/components/:id  | Get the component :id of product :id  | - | Update component :id of product :id | Delete component :id of product :id | - |

Todo
---------------------------------------
* put .json / .xml at the end of the response.
* Implement SSL.
* Implement "only required field" for the response.
* Implement config file.
* Implement components use.
* Implement X-HTTP-Method-Override.
* Implement a rate limiting.
* Implement authentication.
* Implement caching.
