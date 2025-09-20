# Expense Tracker 
## Simple API built with Node.js and Express to track incomes and expenses.

## Dependencies
Node.js
Sqlite 

## How to run
1. create a sqlite database called database.sqlite at project root and a .env file to store you SECRET_KEY for your express session.
2. run 'npm install'
3. run 'node --env-file=.env app.js'


## Endpoints
### Authentication
#### **POST /auth/login**
Log in a user and start a session.  

**Body**:
```json
{
  "email": "user@example.com",
  "password": "YourPassword123!"
}
```
Response:
- 200 OK → "Logged in as <username>" 
- 500 Internal Server Error → session regeneration error 
- 401 Unauthorized → invalid credentials 


#### POST /auth/logout

Destroy the session and log the user out.

Response:
- 200 OK → "User logged out." 
- 500 Internal Server Error → error destroying session
  
### Users
#### POST /users
Register a new user.

Body:
```json
{
  "email": "user@example.com",
  "username": "newuser",
  "password": "ValidPassword1!"
}
```

Response:
- 200 OK → User JSON object
- 400 Bad Request → validation errors

#### GET /users/:id
Get the authenticated user by ID.
Rules:
- Must be logged in. 
- Only the authenticated user can access their own data. 

Response:
- 200 OK → User JSON object 
- 401 Unauthorized → trying to access another user’s data 
- 404 Not Found → user not found 

#### PUT /users/:id
Update user information.

Rules:
- Must be logged in.
- Can only update your own account.

```json
{
  "username": "updatedName"
}
```

Response:
- 200 OK → Updated user object
- 401 Unauthorized → unauthorized access
- 404 Not Found → user not found

#### DELETE /users/:id
Delete a user account.
Rules:
- Must be logged in.
- Can only delete your own account.

Response:
- 200 OK → user deleted
- 401 Unauthorized → unauthorized
- 404 Not Found → user not found

### Transactions
#### POST /transactions
Create a new transaction for the authenticated user.
Body:
```json
{
  "amount": 250.75,
  "category": "income"
}
```
⚠️ userId should not be provided in body → it will always use the logged-in user’s id.

Response:
201 Created → transaction object
400 Bad Request →  validation error or if userId is passed manually.

#### GET /transactions

Get all transactions for the logged-in user.
Query Params (optional):
- category=income → filter by income
- category=expense → filter by expense

Example: GET /transactions?category=income

Response:
```json
[
  {
    "id": "uuid",
    "amount": 100.00,
    "category": "income",
    "createdAt": "date"
  }
]
```
#### GET /transactions/:id
Get a transaction by ID.
Response:
- 200 OK → transaction object
- 404 Not Found → transaction not found

#### PUT /transactions/:id
Update a transaction.

Body (example):
```json
{
  "amount": 300,
  "category": "expense"
}
```
⚠️ userId cannot be changed (taken from session).

Response:
- 200 OK → updated transaction object
- 400 Bad Request → if userId is passed
- 404 Not Found → transaction not found

#### DELETE /transactions/:id
Delete a transaction.

Response:
- 200 OK → deleted successfully
- 404 Not Found → transaction not found
