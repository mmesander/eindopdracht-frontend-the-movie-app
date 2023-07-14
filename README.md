# Installatiehandleiding The Movie App

![screenshot](src/assets/images/screenshot.png)

## Inleiding

Van harte welkom bij The Movie App. Deze applicatie is ontwikkeld om jou te helpen met het inventariseren van jouw film 
of serie keuze. De applicatie laat je trending films en series zien, je kan zoeken naar specifieke titels, of je kan 
een gefilterde zoekopdracht doen naar films, series aan de hand van rating, populariteit en genres. Daarnaast kan je de 
applicatie een suggestie laten doen als je zelf even geen inspiratie hebt. Tot slot kan je films en series toevoegen in 
je favorieten lijst, je watchlist of je al gezien lijst. Onwijs veel plezier met het ontdekken van The Movie App!

## Inhoudsopgave

- Benodigdheden
- Installatie Stappenplan
- Registreren en Inloggen
- De app gebruiken

## Benodigdheden

- **Google Chrome**
  - Het is ten zeerste aan te raden om Chrome te installeren. Deze applicatie is ontwikkeld met Google Chrome als browser. 
  - Klik [hier](https://www.google.com/intl/nl/chrome/) om de laatste versie van Chrome te downloaden.
  

- **IDE (naar keuze)**
  - Je hebt een IDE nodig om de applicatie te kunnen draaien.
  - Webstorm is optimaal voor het runnen van de applicatie.
  - Klik [hier](https://www.jetbrains.com/webstorm/download/?source=google&medium=cpc&campaign=9641686272&term=webstorm&content=523833970973&gad=1&gclid=CjwKCAjw5MOlBhBTEiwAAJ8e1kzh-6XpOJo2tqvGM1ou0kabBmp27O0dyb19BKdaoOgjO5JxQiV7TBoCogAQAvD_BwE#section=windows) om de laatste versie van Webstorm te downloaden.
  - **!Let op:** Webstorm is geen gratis IDE. Je kan een tijdelijke proefversie van 30 dagen downloaden.
  


- **Node JS**
  - Je hebt Node.js nodig om commando's in de terminal te kunnen uitvoeren.
  - Klik [hier](https://nodejs.org/en/download/current) om de laatste versie van node.js te downloaden.


- **GIT**
  - Je hebt GIT nodig om de applicatie te kunnen clonen
  - Klik [hier](https://git-scm.com/downloads) om de laatste versie van GIT te downloaden.


- **API Key**
  - Indien je een docent van Novi bent, dan zit de API key in de projectmap in het textdocument API_KEY
  - Heb je geen bevoegdheid om mij minimaal een 8 te geven? Dan kan je de onderstaande stappen volgen:
    - Klik [hier](https://www.themoviedb.org/signup) om een account aan te maken bij The Movie Database;
    - Zodra je bent ingelogd ga je naar settings en daar klik je op API;
    - Volg de stappen op de website om een API key aan te maken.

## Installatie Stappenplan



1. Installeer google Chrome;
2. Installeer Webstorm of jouw IDE naar keuze;
3. Installeer Node.js;
4. Wanneer je Node.js hebt geinstalleerd is het tijd om je IDE op te starten en te testen of Node.js correct is geinstalleerd:
   - Dit doe je door het volgende command in de terminal te typen: `node-v`
   - Als Node.js aanwezig is zul je een versienummer te zien krijgen, zoals bijv: `v20.4.0`
5. Vervolgens moet gecheckt worden of NPM correct mee geinstalleerd is:
   - Dit doe je door het volgende command in de terminal te typen: `npm -v`
   - Als npm correct geinstalleerd is dan zal je opnieuw een versienummer te zien krijgen, zoals bijv: `9.7.2`
   - Indien je de foutmelding `npm: command not found` krijgt, installeer Node.js dan opnieuw.
6. Optioneel: Webstorm instellen. Tijdens het programmeren is gebruik gemaakt van twee plugins. Om deze te installeren: 
Klik op File en dan op Settings. Klik vervolgens op plugins en download de onderstaande plugins.
   - Monokai Pro Theme
   - Rainbow Brackets
   
   Gelukt? Top! Nu zie je IDE er net zo vrolijk uit als tijdens het ontwikkelen van deze applicatie.
7. Dan gaan we nu als eerste de applicatie binnenhalen:
   - Ga als eerste naar [deze](https://github.com/mmesander/eindopdracht-frontend-the-movie-app.git) directory
   - Klik op de groene button met `<> Code`
   - Klik op File => New => Project from version control...





### `hai`






This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
