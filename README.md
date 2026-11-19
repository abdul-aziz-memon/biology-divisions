# Biology Divisions

A simple, responsive biology project website created by Shayan from Class 9-B. It introduces three divisions of biology: zoology, botany, and microbiology.

## Pages

- `index.html` — project introduction and links to the three biology divisions.
- `zoology.html` — an introduction to the study of animals.
- `botany.html` — an introduction to the study of plants.
- `microbiology.html` — an introduction to microorganisms.

Each page has its own CSS stylesheet and JavaScript file. The scripts add a small scroll-reveal animation. A service worker pre-caches the pages and their CSS/JavaScript, then refreshes cached files in the background when the site is online.

## Run locally

Service workers require localhost or HTTPS, so opening `index.html` directly as a file will not enable caching. To run locally with Python, open a terminal in the project folder and run:

```sh
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000) in a browser. Use the navigation links or division cards to visit the other pages. No build tools or package installation are required.
