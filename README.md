# nodejs-lambda
nodejs function to call api for background processing job with authentication and jwt token

1) authenticate function call the login api, pass in username and password and get a jwt token.
2) if we get the token without error, call trigger function to call the endpoint that will trigger the background event and process the work.

You will need to have your own api for the background processing work. This code basically only do api calls. You can set up AWS cloudWatch event to trigger this with schedule so it will run like a cronjob.
