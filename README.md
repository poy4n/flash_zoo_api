A readme.md file with:
Explanations of the technologies used
Descriptions of any unsolved problems or major hurdles your team had to overcome

# Flash Zoo API Application

Flash Zoo API is an API application to server our Flash Zoo Client application.
The client application requests for user email, cards learnt in each languages, cards to be displayed, photos to be displayed, their english name as well as their translation.

The Flash Zoo uses two APIs, one for the photos and another one for the translation.

## Wireframe:

<img src="wireFrame.jpg">

To remove as much friction as possible we decided to not use passwords for the game. The user would only need to enter an email address and if it did not exist in our database we would then add it otherwise just fetch previous records.

The following step is to choose which language you would like to learn.

Then the user would be presented with 7 cards with a photo and the animal name in English and the language chosen in the previous screen. The player would try to memorise the names and then press play.

The following screen the user will see the 7 cards with only the photo and the animal names in the bottom of the screen in random order. Each name has a color. The user has to match the names with the right photo. When it's a match the card will have borders added to it with the color of the matching name, if it's not a match then the user needs to keep trying to find the right card with a maximum of 10 attempts.

Once finished the user is shown a summary screen displaying the score and the cards learnt.

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

## Challenges:
