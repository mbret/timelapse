https://github.com/madhums/node-express-mongoose-demo

Node API Skeleton
=================

This is a basic and functional Node.js application starter.
It use express.js as a base and sequelize to manage persistence.

This application is based on these convention/best practices
------------------------------------------------------------
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

Here is the list of used modules
--------------------------------
* express

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
