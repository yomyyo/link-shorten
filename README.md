# link-shorten
This application will take links and create a shortened version of the link

To use this project, you will need two terminals open.

First clone the repo

Then "cd ./link-shorten/server"

run "npm i"

then "npm start"

Then in the second terminal, "cd ./link-shorten/client"

run "npm i"

then "npm start"

Once done, you can visit localhost:3000 to use this application

-----------------------

My solution on shortening URLs:

All I did was take the original long url, and the url the user provided, and store them both in a database. 

Then when the user vists the short url, it will pull the original long url from the database, and redirect the user to the correct url.

-----------------------

Problems with my solution:

I didn't have enough time to debug the build and deploy to a server, so the application is running on two different ports on localhost. The front end is running on port 3000, and the back end is running on 3001.

I also didn't add any validation to make sure that the user put in a correct url into the original, they can add whatever string they want. If the user visits that shortened url, they will be taken to a page where they get an error message that they might have an invalid url.
