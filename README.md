"# auth-restApi" 
 
# Used Stack:

* Nodejs/Express
* MongoDB/cluster

# npm Modules
* @hapi/joi -> form validation
* JWT ->  to create token
* bycrypt -> hasing password
* cors -> send data one to another http
* body-parser -> to get form data in json
* hbs -> fot html templating
* dotenv -> to set environment variable seperatly
* mongoose -> to connect with mongoDB
* nodemon -> to run server automatically after changes


* I created a REST API Login Auth and also create Private IP which only access through Header and JWT token.


# To run Project:-
 1. create .env file and add SECRET_TOKEN, MONGO_URI
 2. npm install
 3. npm start
 4. http://localhost:3000

# to test Private Rest API
 1. Postman 
 2.  http://localhost:3000/api/posts
 3. set GET and add header as well as jwt token
 
# to get jwt token 

 Add user through postman  http://localhost:3000/api/user/register that will response a jwt token
