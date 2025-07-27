create a new repository on the command line
echo "# devTinder" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin <https://github.com/Sudeshna556/devTinder.git>
git push -u origin main

push an existing repository from the command line

git remote add origin <https://github.com/Sudeshna556/devTinder.git>
This adds a remote repository named origin pointing to your GitHub repo.
It tells Git where to push your code.

git branch -M main
This renames your current branch to main.
(-M forces the rename, even if main already exists.)

git push -u origin main
This pushes your local main branch to the origin remote (your GitHub repo) and sets it as the default upstream branch for future pushes and pulls.

-------------------------------------------

```js
app.use("/", (req, res) => {
    res.send("Hello from the server!");
});

app.use("/hello", (req, res) => {
    res.send("Hello from the server too!");
});

output :  http://localhost:3000 //prints Hello from the server!
 http://localhost:3000/hello // it also prints Hello from the server!
```

app.use("/", ...) matches all routes, including /hello, since /hello starts with /.
When you visit /hello, Express finds the first matching route (/), sends a response, and stops processing further routes.
Therefore, the /hello handler is never reached.
Solution:
Always put more specific routes (like /hello) before general ones (like /).
Your current code is correct—the /hello route comes first, so /hello works as expected, and / matches everything else.

- The function (req, res) => { res.send(...) } is the route handler (or callback/middleware) — it handles the incoming request and sends a response back.

- How can we handle dynamic routes ?
- Dynamic routes allow you to match routes with parameters.
- For example, /users/:id matches /users/123, /users/456, etc.
- The :id part is a placeholder that matches any value.
- You can access the matched value using req.params.
- For example, req.params.id would be 123 or 456 in the previous examples.

----------------------

why do we create userSchema and userModel
how object and instances are used here

-------------------------------------------

- What is the difference between req.body and req.params?
- req.body is used to get data from the client (e.g., a form submission).
- req.params is used to get data from the URL (e.g., /users/123).
- req.body is parsed by the body-parser middleware, while req.params is not.
- req.body is an object, while req.params is a string.

-------------------------------------------

- What is the difference between req.body and req.query?
- req.body is used to get data from the client (e.g., a form submission).

---------------------------------------------

### 💡 First, what *is* an Endpoint?

When we say **"endpoint"**, we’re referring to a specific **URL path** on the server that handles a particular HTTP request.  
So yes—`http://localhost:3000/feed` *is* an endpoint. It’s usually the *full address* your frontend calls.

But underneath it, the backend code defines **how** that endpoint works. And that’s where this part comes in:

```js
app.get("/user", async (req, res) => {
  // route handler logic
});
```

This line defines an endpoint at `/user`. If your server runs on `localhost:3000`, then:

- This becomes `http://localhost:3000/user`
- It’s the actual **backend route logic** tied to that URL

---

### 🔄 So How Do All These Fit Together?

Here’s how it stacks up:

| Concept         | What It Means                                                                 |
|----------------|--------------------------------------------------------------------------------|
| **API**         | A collection of endpoints that expose backend features to clients             |
| **Endpoint**    | A specific URL path like `/user` or `/feed` that clients can call             |
| **Route Handler** | Code that handles the request for an endpoint and sends a response back      |
| **Middleware**  | Logic that runs before the route handler (like auth checks or logging)        |

### 🔍 Your Code Example Explained

```js
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  // Finds user by email
  const user = await User.findOne({ email: userEmail });
  res.send(user);
});
```

This is the **route handler** for the `GET /user` endpoint in your API:

- The frontend might call `http://localhost:3000/user`
- The server receives the request
- This handler runs the logic to fetch and send the user data back

So everything’s connected:

- Endpoint = URL
- Route handler = code behind that URL
- API = group of such URLs exposed by your backend

----------------------------------------------------

### 🕵️‍♀️ Step-by-Step: How to Identify Real API Endpoints

#### 1. **Use Browser DevTools (Network Tab)**

This is your best friend for tracking API calls.

- Open the webpage in **Chrome** or **Firefox**
- Press `F12` or right-click → **Inspect**
- Go to the **Network** tab
- Filter by **XHR** or **Fetch** (these are async requests, often API calls)
- Interact with the page (click buttons, scroll, etc.)
- Watch for requests like:

  ```js
  GET https://api.example.com/products?page=1
  POST https://api.example.com/login
  ```

These are **real API endpoints** being called by the frontend.

#### 2. **Check the Request Details**

Click on any request in the Network tab and look at:

| Field         | What It Tells You                          |
|---------------|---------------------------------------------|
| **Request URL** | The actual API endpoint being hit          |
| **Method**      | GET, POST, PUT, DELETE — tells the action |
| **Headers**     | Shows auth tokens, content type, etc.     |
| **Payload**     | Data sent with POST/PUT requests          |
| **Response**    | The returned data (often JSON)            |

#### 3. **Look Inside JavaScript Files**

Sometimes endpoints are hardcoded or dynamically built in frontend code.

- Go to the **Sources** tab in DevTools
- Search for keywords like `fetch`, `axios`, `api`, or `.get(`
- You might find something like:

  ```js
  fetch("https://api.example.com/users")
  ```

#### 4. **Use Tools Like Postman or Insomnia**

Once you find an endpoint, test it directly:

- Copy the URL
- Paste it into Postman
- Set the method (GET, POST, etc.)
- Add headers or body if needed
- Send the request and inspect the response

#### 5. **Explore API Docs (If Available)**

Some sites offer public API documentation. Look for:

- `/docs`
- `/swagger`
- `/api-reference`

Gotcha, Sudeshna! These three terms—**API, middleware, and route handlers**—tend to blur together when you’re working with backend frameworks like Express, so let’s untangle them with crystal-clear roles, examples, and how they connect.

---

### 🔗 What is an API?

**API** stands for **Application Programming Interface**. In web development, it's a **set of endpoints** that a client (like a frontend app or mobile app) can call to interact with the backend server—like sending data, fetching resources, or triggering actions.

Example:
```http
GET /api/users → gets a list of users  
POST /api/login → authenticates user credentials
```

Think of an API as a collection of doors into your backend services—each door leads to a specific function.

---

### ⚙ What is Middleware?

Middleware is like the **security desk and reception** before someone reaches a door (route handler) in your API. It’s a **function** that processes the request as it flows through your server, allowing you to:
- Authenticate a user ✅
- Log request details 📝
- Parse JSON bodies 📦
- Handle errors ❌

Example:
```js
app.use(express.json()); // Parses incoming JSON request body
app.use(authMiddleware); // Verifies JWT token before accessing protected routes
```

It sits **inside the backend**, between request arrival and the business logic.

---

### 🎯 What is a Route Handler?

A **route handler** is the **actual business logic** tied to an API endpoint. It decides:
- What data to return
- What action to perform
- What response to send to the client

Example:
```js
app.get('/api/users', (req, res) => {
  // Fetch users from DB and respond
  res.json(users);
});
```

Middleware might check if the user is logged in, but **the route handler decides what to do with that authenticated request**.

---

### 🧵 How They Work Together

Here’s a flow using Express.js:

```js
// Middleware: Checks auth
app.use(authMiddleware);

// Route Handler: Serves dashboard if authenticated
app.get('/dashboard', (req, res) => {
  res.send('Welcome to your dashboard, ' + req.user.name);
});
```

So in one sentence:  
> The **API** defines the available endpoints, **middleware** processes requests before they reach the endpoint, and **route handlers** execute the main logic when a request hits a route.


------------------------------------------VALIDATOR------------------------------------------------

# install : npm i validator

- A library of string validators and sanitizers.
- This library validates and sanitizes strings only.
- add schema validations within model data fields and API validations.

> isLowercase(str)	check if the string is lowercase.
> isMobilePhone(str [, locale [, options]])	check if the string is a mobile phone number,
> isStrongPassword(str [, options]) Default options:
{ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }
> isUppercase(str)	check if the string is uppercase.
> isURL(str [, options]) check if the string is a URL.options is an object which defaults to { protocols: ['http','https','ftp']
> isJWT(str)	check if the string is valid JWT token.
> 

# Schema-Level Validations
These are validations defined directly in your data model or schema, typically using tools like Mongoose or JSON Schema.
🔍 Purpose:
- Ensure that data stored in the database follows a specific structure.
- Catch invalid data before it’s saved.
✅ Examples:
- Required fields (required: true)
- Data types (type: String, type: Number)
- Custom validators (validate: function(val) { return val.length > 5 })

# 🌐 API-Level Validations
These happen before data reaches your database — typically in your Express route handlers or middleware.
🔍 Purpose:
- Validate incoming requests (body, query, params).
- Prevent bad data from even reaching your schema.
- Provide meaningful error messages to clients.
✅ Examples:
- Checking if required fields exist in req.body
- Validating formats (e.g., email, phone number)
- Sanitizing inputs
- Rate limiting or authentication checks
ex
```js
app.post('/register', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  next();
});

```
-------------------------------------Data SANITIZATION (part of validators)--------------------------------

Data sanitization in backend development refers to the process of cleaning and validating user input to prevent malicious data from entering the system.It helps protect against common vulnerabilities like SQL injection, cross-site scripting (XSS), and malformed payloads.- Enhances API reliability and security.
- Helps maintain data integrity across services.


        1. Validation of data
        2. Encrypt the Password

create a new folder , name it as `util` or `helper`, create validation file.


