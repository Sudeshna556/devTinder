API validation add to model
check schema level validations & API level validations

what is data sanitization
explore validator library and install it
check validator fun for email,pw, photo and other fields as well.

season-2 lec:09 ||  encrypting pw

        1. Validation of data
        2. Encrypt the Password

create a new folder , name it as `util` or `helper`, create validation file.

-----------------------------------------28-07-2025(lec-10)-----------------------------------------------
- install cookie-parser
- just send a dummy cookie to user
- cretaea GET/profile API and check if you get the cookie back
- install jsontoken
- create jwt token in login api,validate email and pw and send it back to the user
- read the cookies inside your profile API and find the logged in user


- userAuth Middleware
- add the userAuth middleware in profile and a new sendConnectionRequest API
- set the expiry of JWT token and cookies to 7 days


----------------------------------29-07-25 (lec - 11 : deep dive into APIs)---------------------------------------------------

- write down a list of all api of your application
- group multiple routes under respective routers
- create a route folder and manage all the routes there
- import these router in app.js
