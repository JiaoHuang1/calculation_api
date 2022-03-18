# Start Application:

To start the application locally, run `npm install` and then `npm start`

When server starts, it runs continously and print the result in console every 2 seconds.

Sample output:

--------------------------1----------------------

 id: 54a4d919-700f-47d8-aad8-5511dd013d3e 
 operation: addition 
 left: -1828577033836511 
 right: 1075581700474009 
 result: -752995333362502 

Correct

--------------------------2----------------------

 id: 933254b8-eb5e-4cb0-9319-bed5fe121755 
 operation: division 
 left: -7064948341022467 
 right: -7617885292517427 
 result: 0.9274159520309297 

Correct

# Test Application:

To test the application, run `npm test`

# Routes:

## Main route - GET /api/interview:

This is the main route. 
When server starts, it calls this route every two second to return result.

1. It calls the external GET api to get the `id`, `operation`, `left`, `right`
2. It then calculate `result` based on `operation`, through helper routes below.
3. It send `id` and `result` to the given external POST api to return the response.
4. It catches errors during the process 

## Helper routes

Helper routes are built so that we can unit test the main route.

### POST /api/interview/add:

calculate `left` + `right`

### POST /api/interview/subtract:

calculate `left` - `right`

### POST /api/interview/multiply:

calculate `left` * `right`

### POST /api/interview/divide:

calculate `left` / `right`

### POST /api/interview/modulus:

calculate `left` % `right`

### POST /api/interview:

Call external POST api with `id` and `result` calculated from above routes to get the final response back
