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

Add Song
POST request
/songs
takes "songid" AND "title" in the body

Get all users
GET request
/users

Get user
GET request
/users/:name

Delete user
DELETE request
/users/:name

Add LIKE Relationship
POST request 
/likematch
takes "songid" AND "userid" AND "weight" in the body
weight is 0.5 for neutral and 1 for like

UN-LIKE Relationship (Undo the LIKE Relationship)
POST request
/unlikematch
takes "songid" AND "userid"


Get recommendation
POST request
/group/rec
query user


