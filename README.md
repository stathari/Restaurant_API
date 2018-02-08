# Restaurant_API
Using Node.js and MySQL

## Technologies used
Node.js, npm, MySQL.

### Initial setup for the web server:
- Install Node.js, MySQL
- Run the Restaurants.sql script file on mysql prompt using source command.
- Edit the values for elements in the .env file
- As the application is built using Node.js the dependencies(modules)for the project can be installed using the "npm install" command from the root folder where the package.json
- Run "npm start" or "node ./server.js" to start the webserver
- Once the server is up and running open the url http://<<ipaddress>>:port [ for checking the server is up and running ].
    
## Following are the service end points implemented:
#### Service url: http://(ip_address):(port)/

| Method | Description                             | Service Endpoint       | 
|--------|-----------------------------------------|------------------------| 
| GET    | Get all the restaurants                 | /restaurants           | 
| GET    | Get the restaurant with a restaurant_ID | /restaurant/ID         | 
| POST   | Adding a restaurant to the system       | /restaurant/add        | 
| DELETE | Deleting a restaurant                   | /restaurant/delete/ID  | 
| GET    | Get all menus in a restaurant           | /menus/ID              | 
| POST   | Add menu to the restaurant              | /menus/add             | 
| DELETE | Delete menu                             | /menus/delete/RID&MENU | 
| GET    | Get menu items in a restaurant          | /menuitems/RID         | 
| POST   | Adding menu items                       | /menuitems/add         | 
| DELETE | Deleting a men item                     | /menuitems/delete      | 




## Testing:
#### Open the postman Rest client for running the test cases 
- Captured all the test url with a self descriptive names:
"Restaurants.postman_collection_TestCases.json"


#### Working on the following items:
- logging to the DB or a file in case of failures.
- Cache implementation using Redis


  
  
