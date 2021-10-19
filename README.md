# CPSC581-P2-Sensor
CPSC581 Project 2: Design and implement an alternative to "Slide to Unlock" using sensor(s)

## Project of choice: Simon Says
## Project site: http://cpsc581.p2.2.osloz.com
## Structure:

Super simple html app here:

* ```index.html``` - Start of app
* ```js/``` - JavaScript scripts
* ```js/start``` - Start of custom scripts
* ```css/``` - Stylesheets go here
* ```css/style.css``` - Main stylesheet
I've gone ahead and added the latest JQuery to the app. But other than that this is a basic html/js/css application. 

I've got this project hosted at https://cpsc581.p2.2.osloz.com, with a basic CI system. And by basic I mean basic, the contents of this repository are cloned to the server where this project resides.

Anytime a push is made onto the main branch the deployment process clones this repo on the server. Changes should be live within the minute.


### Make your life easier

If you use *vscode* install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extention. It automatically reloads any file you change, very nice.

### TODOS: 

#### ```js/simonSays.js```:

* implement ```checkAttempt()```
* implement ```playPattern()```
* implement ```wrongPattern()```

#### ```css/```

* style ```simon-option`` to look better
* style ```main-screen```

#### ```index.html```

* Add image to ```main-screen```, to make it look like the main phone screen


### Division of work

* In order to prevent git issues, only one person should be working on a given file at a time. So one can do html and css and the other js.

* Iphones require an https connection to grant motion sensor access. So testing on a local server is quite a hassle for the scope of this project. Lucky for us this project is hosted on a server with ssl enabled for it. So to test changes affecting the motion sensor, you must push your changes and test on production server. Production server should update pretty soon after the push.