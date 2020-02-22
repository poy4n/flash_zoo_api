# Flash Zoo API Application
Click here to access: https://beasuf.github.io/flash_zoo_client/

Flash Zoo is an educational Single Page Application game. In development two APIs are utilised. The translation API is used for translating name of animals from English into three different languages. A photo API is used to collect images in order to assign them to the chosen words. Then flashzoo cards are generated on the DOM.

## User Interface Diagram:

<img src="wireFrame.jpg">

## Game Play

To optimise the user journey on the page there is no need to signup or signin. The user only needs to enter an email address to enter and to choose between three given languages.

In memory screen the user will be presented with 7 cards each with a photo, the animal name in English as well as the translation in chosen language from the previous screen. Now the user can memorise each image with the matching foreign language.

In the game screen the user will see the 7 cards with the photo and the matching foreign language. Each name is assigned to a color and the user has 10 clicks to match the names with the right photo. When it's a match the card will change its background into the color of the matching name with a flip animation. If it's not a match the card will blink as a sign of an error and then the user can keep trying to find the right card until the max number of clicks is reached.

In the rersult summary the user will be preseneted with all cards played and a score line to show number of correct and incorrect matches.

## Technologies used:

- Node.js
- JavaScript
- Nodemon
- PG
- Lodash
- Cors
- Axios
- DotEnv
- Express
- Unsplash API (photo)
- Yandex API (translation)
- Data Structure between front-end & back-end

## Challenges:

- Interpreting the API information
- Data transformation from API to controllers
- MVC design pattern
- Use of Async functions