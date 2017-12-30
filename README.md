# Thales-Journey

### Contents
  * Current Version
  * Schema
  * Client Errors
  * HTTP Redirects
  * HTTP Verbs
  * Authentication
  * Rate Limiting

## API
### Current Version
The current version of the API is ***v1***, all requests to the api address at `https://api.webaddress.co.uk/` will default to this version.

### Schema
All API access is over HTTPS and therefore accessed using `https://`, all other methods will be dropped. All data sent and recievved must be in JSON format.

Timestamps will be returned in ISO 8601 format:

```
YYY-MM-DDTHH:MM:SSZ
```

### Client Errors
#### 1. Sending Invalid JSON
```
HTTP/1.1 400 Bad Request
Content-Length: 35
   
{"message":"Problems parsing JSON"}
```  
#### 2. Sending Wrong Type of JSON
```  
HTTP/1.1 400 Bad Request  
Content-Length: 40  
  
{"message":"Body should be a JSON object"}  
```  
#### 3. Sending Invalid Fields
```
HTTP/1.1 422 Unprocessable Entity
Content-Length: 149

{
  "message": "Validation Failed",
  "errors": [
    {
      "resource": "Issue",
      "field": "title",
      "code": "missing_field"
    }
  ]
```

| Error Name       |	Description |
|------------------|--------------|
| `missing`        |	This means a resource does not exist. |
| `missing_field`  |	This means a required field on a resource has not been set. |
| `invalid`        |	This means the formatting of a field is invalid. The documentation for that resource should be able to give you more specific information. |
| `already_exists` |	This means another resource has the same value as this field. This can happen in resources that must have some unique key (such as Label names). |

### HTTP Redirects

|Status Code |	Description|
|------------|-------------|
|`301` |	Permanent redirection. The URI you used to make the request has been superseded by the one specified in the Location header field. This and all future requests to this resource should be directed to the new URI.|
|`302`, `307` |	Temporary redirection. The request should be repeated verbatim to the URI specified in the Location header field but clients should continue to use the original URI for future requests.|

### HTTP Verbs

|Verb |	Description|
|-----|------------|
|`HEAD` |	Can be issued against any resource to get just the HTTP header info.|
|`GET` |	Used for retrieving resources.|
|`POST` |	Used for creating resources.|
|`PATCH` |	Used for updating resources with partial JSON data. For instance, an Issue resource has title and body attributes. A PATCH request may accept one or more of the attributes to update the resource. PATCH is a relatively new and uncommon HTTP verb, so resource endpoints also accept POST requests.|
|`PUT` |	Used for replacing resources or collections. For PUT requests with no body attribute, be sure to set the Content-Length header to zero.|
|`DELETE` |	Used for deleting resources.|
  
### Authentication
- Application Token
- Request Nonce
- Login
- Logout

### User Manipulation Functions
- Forgotten Password
- Change Password
- Create New User
- Verify User
- Delete User
- Update User

### Journeys
- Add Journey
- Delete Journey
- Update Journey

### Mapping
- get journeys
- get nearby users

## Authentication
### Login
```JSON
  {"username": "Username", "password": "password123", "captcha": "1636778hfse78f98se"}
```
```javascript
$.post("https://webaddress.co.uk/api/authentication/login", function(username, password, captcha, nonce));
```


| Method | Description |
|--------|-------------|
|rateLimit|
