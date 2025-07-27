# why post method is used for both Signup and Login user, (b/c in case of login we retrive data so `GET` mwthod should be used i think) ?
To log in to an account, the correct HTTP method to use is **`POST`**. Here's why:

### ✅ Why `POST` is used for login
- **Sensitive data transmission**: Login credentials (like username and password) are sent in the request body, not in the URL. `POST` allows this, while `GET` puts data in the URL query string — which is insecure.
- **No caching**: `POST` requests are not cached by browsers or proxies, which is safer for authentication.
- **Side effects**: Logging in changes the server state (e.g., creating a session), and `POST` is designed for operations that cause side effects.

### ❌ Why `GET` is not suitable
- **Exposes credentials**: Data in a `GET` request is visible in the URL, which can be logged or cached — a major security risk.
- **Semantics**: `GET` is meant for retrieving data, not submitting forms or changing server state.


