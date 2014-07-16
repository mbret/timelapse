Node API Skeleton
=================

Simple api skeleton using node.js. This RESTful api is based on REST and use then as much as possible HTTP standard and info to treat a request and provide a response. The api call are based on HTTP verbose and url definition.

This applicaiton is a basic but ready to use skeleton. It use a mysql database and implement the minimal requirement for production's release.

* Response format use http://labs.omniti.com/labs/jsend convention.

What is provided and implemented by the skeleton
------------------------------------------------
* Logging of request traffic and application logging.
* Separate config files and server management.
* Separate and structurated routes system.

Here are the current supported api call
---------------------------------------
| Resource	  | GET | POST | PUT | DELETE |
| ------------- | ------------- | ------------- | ------------- |------------- |
| /products  | Get the list of products  | Add a new product | Update multiple products | Delete all products |
| /products/:id  | Get a product based on id  | - | Update a product based on id | Delete a product based on id |
| /products/random  | Get a random product  | - | - | - |
