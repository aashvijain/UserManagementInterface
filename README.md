In this project, I implemented a User Management System using Express.js (Node.js) and MongoDB and allows users to register, log in, and manage their profiles. 
The system includes user authentication using JWT tokens and password encryption with bcrypt.js to ensure security.

Project Overview
Before starting the project, I installed VS Code, Node.JS using npm, and MongoDB so that I would have all of the required software in order to create my application. 
I developped the frontend program using HTML, CSS, and JavaScript files (under "public") and then developped the backend program using javascript files (server.js, user.js, middleware)

Functionality of program
The first page that is displayed (under index.html) gives the user an option to either follow the "new user" route or the "exiting user" route. If a new user, then they will be 
prompted to create a new account (userregister.html & script.js). If a returning user, they will be prompted to log in (login.html & script2.js). After loggin in, they will then
have the option to view their profile (viewprofile.html & script3.js) or update their profile (updateprofile.html & script4.js). There is also a home button at the top of every 
screen that brings them back to the original page (index.html) 

APIs
The first API that I implemented was "/register." This API registered new users, validated input fields, checked if the user already exists in MongoDB, securely hashed the password, and then 
stored all of the user's information in the database (MongoDB). The next API that I implemented was "/login" which logged in existing users. This API checked if the user exists, validated the 
password (returned an error message if either the password was incorrect or the user did not exist), and generated a JWT token to authenticate the user. The third API that I implemented was 
"/profile" which had a get function to view the user's profile and a put function to update the user's profile. "/profile" (get) found the user's information in MongoDB and displayed the name
and email of the user. "/profile" (put) found the user in MongoDB, updated the user's profile based on information entered, saved the new information, returned the user's name and email, and 
asked them to log in again with their new credentials. 

Testing the Program
To test this program, I ran servers on my computer's local machine (port 8000) and connected it to my Google Chrome browser using the reference "http://localhost:8000". The implementation of
this server is found in "server.js"

Testing User Registration
To test the functionality of the user registration API, I used my browser to run the program and added a test user ("test@gmail.com") and then provided invalid inputs (ex. "test.com" - invalid
email, duplicate users) to ensure that all error messages and responses were being returned as expected. 

Testing user login
To test the functionality of the user login API, I used my browser to run the program and tried to log in for the test user that I created ("test@gmail.com", password: "test") and provided 
invalid inputs (ex. "test.com" - invalid email, "test1234" - invalid password) to verify that all error messages and responses were being returned as expected. 

Testing view profile
To test the functionality of the view profile API, I ensured that this function was only working for valid users. The program was not working after a user updated their profile because they 
would be logged in with their old credentials (which no longer existed) and added error messages asking the user to log in again with newer credentials so they could view their new profile. 

Testing update profile
To test the functionality of the update profile API, I created a new test user ("test2@gmail.com") and updated the test user's profile with the new name and email. I also tried invalid test 
cases, such as trying to update the profile with a name and email that already exists in MongoDB to ensure that all error messages and responses were returned as expected. I then asked the 
user to log in again with their new credentials.

I utilized the Postman Client to test all of my APIs and ensure that they were working as expected and detailed in the requirements document. 

I was unsure of the methods for implementing the isAdmin functionality because it was not present in any APIs besides viewprofile, so the program never asked the user for that information, and 
consequently, it was not stored in MongoDB. 
