# HOS08 - Backend
### James Iden Busia

## Problem Statement
The development team needs to build and test an Express REST API with MongoDB Atlas to enable full CRUD operations on employee records. Without proper environment configuration, port exposure in Codespaces, and verified endpoints via Postman, the application cannot reliably manage worker data.

## Goals
* **Configure Backend Files:** Create the `backend/` directory using ES Module syntax (`.mjs` files), including `server.mjs` on port 5050, `db/conn.mjs`, `loadEnvironment.mjs`, and `routes/record.mjs`.
* **Implement CRUD Endpoints:** Complete all 5 specified REST API endpoints under `/record` (`GET /record`, `GET /record/:id`, `POST /record`, `PATCH /record/:id`, `DELETE /record/:id`).
* **Configure Environment & Network Access:** Connect to MongoDB Atlas using the `ATLAS_URI` from `config.env` and expose port 5050 as Public in GitHub Codespaces for external API accessibility.
* **Execute Test Data Operations:** Create records for John, Sean, and Matthew via Postman (`hos08` collection), update Matthew's position to "Senior Software Engineer 2", and delete the record for John.
* **Deliver Verification Proof:** Generate and save all 5 required verification screenshots using the standard naming convention (`01_node_server_...` through `05_postman_update_...`).

## Non-Goals
* **User Authentication and Authorization:** No login, user authentication, role-based access control (RBAC), or JWT token verification will be implemented for the endpoints.
* **Frontend User Interface:** No web client or mobile UI will be developed; all API interaction and testing are strictly restricted to Postman and direct HTTP requests.
* **Complex Data Schema & Validation:** Fields are restricted strictly to `{ name, position, level }` with no additional employee metadata, input sanitization, or schema validation logic implemented this sprint.
* **Production Deployment & CI/CD Pipelines:** The application will only run locally within GitHub Codespaces, with no deployment to cloud hosting providers or automated testing/deployment pipelines.

## Actors and Roles
| Actor | Type | Primary Goal |
| --- | --- | --- |
| **Maria Chen** | User (Product Manager) | Define requirements and scope for the employee records backend application |
| **Alex Rivera** | User (Developer) | Obtain exact specifications (API paths, schema) to build the application |
| **Sam Park** | User (Tech Lead) | Provide technical specs, API route mappings, test procedures, and delivery requirements |
| **Node/Express API Server** | Service (Backend App) | Handle HTTP REST requests and execute CRUD logic on employee records |
| **MongoDB Atlas** | External System (Database) | Store and persist employee record documents |
| **Postman** | External System (Testing Tool) | Test and verify all 5 REST API CRUD operations |
| **GitHub Codespaces** | External System (Environment) | Host the development environment and expose port 5050 publicly |

## Functional Requirements
**Server & Configuration**

* The system shall run an Express server on port 5050 configured via ES Module syntax (`server.mjs`).
* The system shall load environment variables from a `config.env` file containing the `ATLAS_URI` variable using `loadEnvironment.mjs`.
* The system shall establish and maintain a database connection to MongoDB Atlas defined in `db/conn.mjs`.

**API Routes & Data Operations**

* The system shall expose a `GET /record` endpoint that returns an array of all employee record documents from the `records` collection.
* The system shall expose a `GET /record/:id` endpoint that retrieves a single employee record document matching the provided MongoDB `_id`.
* The system shall expose a `POST /record` endpoint that creates a new employee record accepting `name`, `position`, and `level` fields in the request body.
* The system shall expose a `PATCH /record/:id` endpoint that updates specified fields of an existing employee record matching the provided MongoDB `_id`.
* The system shall expose a `DELETE /record/:id` endpoint that removes an employee record matching the provided MongoDB `_id`.

## Non-Functional Requirements
**Performance**

* **Port Availability & Accessibility:** Port 5050 must be configured as Public within GitHub Codespaces to eliminate network blocking and allow external HTTP clients (like Postman) to connect without authentication timeouts or CORS issues.
* **Database Connection Reuse:** The MongoDB driver connection established in `db/conn.mjs` must be initialized once and reused across route executions to minimize connection overhead and latency on API requests.

**Security**

* **Environment Variable Isolation:** Database connection credentials (`ATLAS_URI`) must be strictly decoupled from application source code and stored in an isolated `config.env` file loaded via `dotenv` to prevent sensitive credentials from leaking into version control.
* **Exposed Port Risk Management:** Exposing port 5050 publicly in Codespaces must be restricted to the active development and testing phase to prevent unauthorized external access to the MongoDB instance while in lower environments.

**Privacy**

* **Data Minimization:** Employee record payloads must be strictly scoped to necessary attributes (`name`, `position`, `level`) to minimize exposure of personally identifiable information (PII) across network requests and server logs.

**Maintainability**

* **Standardized Module Syntax:** The codebase must consistently use ES Module syntax with `.mjs` file extensions across all modules (`server.mjs`, `db/conn.mjs`, `loadEnvironment.mjs`, `routes/record.mjs`) to maintain clean modular boundaries and consistent runtime behavior in modern Node.js.
* **Structured Directory Organization:** Application components must follow a modular folder layout (separating routes, database connection logic, and environment configurations into distinct subdirectories) to ensure the API is easily debuggable, scalable, and simple for new developers to navigate.

## Architecture Overview
```
+---------------------------------------------------------------------------------+
|                               GITHUB CODESPACES                                 |
|                                                                                 |
|  +-------------------+              HTTP REST Requests                          |
|  |                   |        (Port 5050 - Set to Public)                       |
|  |  Postman Client   | =========================================+               |
|  |  (Collection:     |                                          |               |
|  |   hos08)          | <======================================+ |               |
|  +-------------------+             JSON Responses             | |               |
|                                                               | |               |
|                                                               v v               |
|  +---------------------------------------------------------------------------+  |
|  | Node/Express API Server (backend/)                                         |  |
|  |                                                                           |  |
|  |   +---------------------+        +-------------------------------------+  |  |
|  |   | loadEnvironment.mjs | -----> |             config.env              |  |  |
|  |   | (dotenv)            |        |   [Stores ATLAS_URI credentials]    |  |  |
|  |   +---------------------+        +-------------------------------------+  |  |
|  |              |                                      |                     |  |
|  |              v                                      v                     |  |
|  |   +---------------------+        +-------------------------------------+  |  |
|  |   |     server.mjs      | -----> |             db/conn.mjs             |  |  |
|  |   |   (Runs Port 5050)  |        |    (MongoDB Driver Connection)      |  |  |
|  |   +---------------------+        +-------------------------------------+  |  |
|  |              |                                      |                     |  |
|  |              v                                      |                     |  |
|  |   +-------------------------------------+           |                     |  |
|  |   |          routes/record.mjs          |           |                     |  |
|  |   |  - GET    /record                   |           |                     |  |
|  |   |  - GET    /record/:id               | <---------+                     |  |
|  |   |  - POST   /record                   | (Reads / Writes to DB Connection) |  |
|  |   |  - PATCH  /record/:id               |                                 |  |
|  |   |  - DELETE /record/:id               |                                 |  |
|  |   +-------------------------------------+                                 |  |
|  +---------------------------------------------------------------------------+  |
+-----------------------------------|---------------------------------------------+
                                    |
                                    | MongoDB Wire Protocol / TCP
                                    v
            +-----------------------------------------------+
            |                 MONGODB ATLAS                 |
            |              (Cloud Database)                 |
            |                                               |
            |   +---------------------------------------+   |
            |   |          'records' Collection         |   |
            |   |   Documents:                          |   |
            |   |   - _id                               |   |
            |   |   - name                              |   |
            |   |   - position                          |   |
            |   |   - level                             |   |
            |   +---------------------------------------+   |
            +-----------------------------------------------+

```

## API Design
### API Specification (`/record`)

**Base URL:** `http://localhost:5050/record` (or your Codespaces public URL)

**Content-Type:** `application/json`

---

#### 1. Get All Records

Retrieves an array containing all employee records stored in the database.

* **Method:** `GET`
* **Path:** `/record`
* **Request Body:** None
* **Success Response:**
* **Status Code:** `200 OK`
* **Body:**
```json
[
  {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "John",
    "position": "Developer",
    "level": "Junior"
  },
  {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
    "name": "Sean",
    "position": "Designer",
    "level": "Mid"
  }
]

```




* **Error Response:**
* **Status Code:** `500 Internal Server Error`
* **Body:** `"Error fetching records"`



---

#### 2. Get Single Record by ID

Retrieves a specific employee record matching the provided MongoDB `_id`.

* **Method:** `GET`
* **Path:** `/record/:id`
* **Request Body:** None
* **Success Response:**
* **Status Code:** `200 OK`
* **Body:**
```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "name": "John",
  "position": "Developer",
  "level": "Junior"
}

```




* **Error Responses:**
* **Status Code:** `404 Not Found`
* **Body:** `"Record not found"`


* **Status Code:** `500 Internal Server Error`
* **Body:** `"Error fetching record"`





---

#### 3. Create New Record

Inserts a new employee record into the database.

* **Method:** `POST`
* **Path:** `/record`
* **Request Body:**
```json
{
  "name": "Matthew",
  "position": "Software Engineer",
  "level": "Senior"
}

```


* **Success Response:**
* **Status Code:** `204 No Content` (or `201 Created` with created object/ID details)
* **Body:** Empty or MongoDB `acknowledged` response


* **Error Response:**
* **Status Code:** `500 Internal Server Error`
* **Body:** `"Error adding record"`



---

#### 4. Update Record

Modifies specific fields of an existing employee record matching the provided `_id`.

* **Method:** `PATCH`
* **Path:** `/record/:id`
* **Request Body:** (partial updates allowed)
```json
{
  "position": "Senior Software Engineer 2"
}

```


* **Success Response:**
* **Status Code:** `200 OK`
* **Body:** Update status result or modified document details


* **Error Responses:**
* **Status Code:** `404 Not Found`
* **Body:** `"Record not found"`


* **Status Code:** `500 Internal Server Error`
* **Body:** `"Error updating record"`





---

#### 5. Delete Record

Removes an employee record from the database by its `_id`.

* **Method:** `DELETE`
* **Path:** `/record/:id`
* **Request Body:** None
* **Success Response:**
* **Status Code:** `200 OK`
* **Body:** Deletion result details


* **Error Responses:**
* **Status Code:** `404 Not Found`
* **Body:** `"Record not found"`


* **Status Code:** `500 Internal Server Error`
* **Body:** `"Error deleting record"`

## Data Model
Data moves through three distinct layers in this system: client request payloads, database documents, and runtime configuration parameters.

### Database Document Schema (`records` Collection)

In MongoDB Atlas, each employee record is stored as a BSON document in the `records` collection.

| Field Name | Type | Constraints | Description |
| --- | --- | --- | --- |
| `_id` | `ObjectId` | Auto-generated, Primary Key | Unique 24-character hexadecimal identifier generated by MongoDB |
| `name` | `String` | Required | Full name of the employee (e.g., `"John"`, `"Matthew"`) |
| `position` | `String` | Required | Job title or role (e.g., `"Senior Software Engineer 2"`) |
| `level` | `String` | Required | Seniority level or tier (e.g., `"Senior"`, `"Junior"`) |

**JSON Schema Representation:**

```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "name": "Matthew",
  "position": "Senior Software Engineer 2",
  "level": "Senior"
}

```

---

### In-Transit API Data Structures

#### 1. Create Payload (`POST /record`)

Sent by Postman to insert a new employee.

```json
{
  "name": "Sean",
  "position": "Developer",
  "level": "Mid"
}

```

#### 2. Update Payload (`PATCH /record/:id`)

Sent by Postman to partially update fields of an existing record.

```json
{
  "position": "Senior Software Engineer 2"
}

```

#### 3. Response Array Payload (`GET /record`)

Returned by Express containing an array of all record documents.

```json
[
  {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
    "name": "Sean",
    "position": "Developer",
    "level": "Mid"
  },
  {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d3",
    "name": "Matthew",
    "position": "Senior Software Engineer 2",
    "level": "Senior"
  }
]

```

---

### Configuration Data Structure (`config.env`)

Environment configurations are parsed as key-value string pairs into `process.env` at server initialization via `dotenv`.

| Key | Type | Example Value | Description |
| --- | --- | --- | --- |
| `ATLAS_URI` | `String` | `mongodb+srv://<user>:<password>@cluster0.mongodb.net/employee_db` | MongoDB Atlas database connection URI string |
| `PORT` | `Number` | `5050` | Runtime HTTP port for Express |

## Tech Stack Justification
* **Node.js:** Chosen as the server-side runtime to execute JavaScript outside the browser, allowing the team to use a single language across the full stack.
* **Express.js:** Chosen because it provides a lightweight, unopinionated framework that simplifies HTTP request routing and middleware integration for building REST APIs.
* **MongoDB Atlas:** Chosen as a fully managed cloud document database that natively stores data as JSON-like BSON, matching the structure of JavaScript API payloads.
* **ES Modules (`.mjs` syntax):** Chosen to utilize official standard ECMAScript `import`/`export` module syntax instead of legacy CommonJS (`require`), ensuring modern and future-proof code structure.
* **`dotenv`:** Chosen to securely load sensitive environment variables (like database credentials) from a `config.env` file into `process.env` without hardcoding them.
* **Postman:** Chosen as an API client tool to test, execute, and verify all CRUD endpoint operations independently of a frontend UI.
* **GitHub Codespaces:** Chosen to provide a standardized, cloud-hosted development environment with configurable public port forwarding for backend access.

## Open Questions
* **Database Name and Driver Version:** What specific database name should be appended to the `ATLAS_URI` connection string, and which version of the official `mongodb` driver package should be specified in `package.json`?
* **Request Validation and Sanitization:** How should the API handle malformed JSON bodies, missing required fields (e.g., submitting a POST request without a `level`), or invalid MongoDB `_id` formats passed as route parameters?
* **Error Handling & Status Codes:** What standard HTTP status codes and error payload structures should be returned when an operational error occurs (e.g., returning a `400 Bad Request` vs `500 Internal Server Error`, or `201 Created` vs `204 No Content` on successful POSTs)?
* **CORS Configuration:** Does the server require cross-origin resource sharing (`cors`) middleware enabled on port 5050 to allow browser-based clients or web applications to hit the endpoints directly?
* **Postman Screenshot Naming & Details:** How should developers substitute `firstname_lastname` in the required screenshot filenames, and must the Postman workspace visible in those captures demonstrate response status codes (`200 OK`, `204 No Content`) and timing stats?
* **Connection Lifecycle & Error Recovery:** How should `db/conn.mjs` manage database connection failures at startup or handle connection pooling and retries if MongoDB Atlas drops the socket during runtime?

### My Questions
* Why have a separate module for loading environment variables rather than loading it in the main JS file?
* Shouldn't we connect to Atlas via the connection string? How do we use just the URI?
* Shouldn't we name the records something that indicates what type of records they are, like "employeerecords"?
