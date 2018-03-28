Server setup instructions:
Programs needed: Node.js, Neo4j desktop, Postman (for testing)
1. Open console, change directory to project folder
(e.g. C:/Users/your-name/Documents/thePeoplesServer)
2. Run "npm install nodemon" (only necessary the first run)
3. Run "npm run start", this will start the server on port 3000
4. Start a neo4j graph with username "neo4j", password "gimme"
5. Use postman to send http requests, API below


base address http://ip:PORT/api

API functions:

Add User
POST request
/users
takes "userid" in the body

Get all users
GET request
/users

Get user
GET request
/users/:name

Delete user
DELETE request
/users/:name

Get recommendation
POST request
/group/rec?
