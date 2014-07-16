Node API Skeleton
=================

Simple api skeleton using node.js. This RESTful api is based on REST and use then as much as possible HTTP standard and info to treat a request and provide a response. The api call are based on HTTP verbose and url definition.

This applicaiton is a basic but ready to use skeleton. It use a mysql database and implement the minimal requirement for production's release.

This application is based on these convention/best practices:
* http://labs.omniti.com/labs/jsend convention.
* http://www.nielskrijger.com/2013/08/rest-and-json-api-guidelines-and-best.html

What is provided and implemented by the skeleton
------------------------------------------------
* Logging of request traffic and application logging.
* Separate config files and server management.
* Separate and structurated routes system.

Here are the current supported api call
---------------------------------------
| Resource	  | GET | POST | PUT | DELETE | PATCH |
| ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
| /products  | Get the list of products  | Add a new product | Update multiple products | Delete all products | - |
| /products/:id  | Get a product based on id  | - | Update a product based on id | Delete a product based on id | - |
| /products/random  | Get a random product  | - | - | - | - |
| /products/:id/components  | Get all components of product :id  | Add new component to the product :id | Update multiple components of the product :id | Delete all components of the product :id | - |
| /products/:id/components/:id  | Get the component :id of product :id  | - | Update component :id of product :id | Delete component :id of product :id | - |
