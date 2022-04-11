# pet-shelter
![GitHub](https://img.shields.io/github/license/VeselaVideva/pet-shelter?color=blue&style=for-the-badge) ![GitHub repo size](https://img.shields.io/github/repo-size/VeselaVideva/pet-shelter?style=for-the-badge) ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/VeselaVideva/pet-shelter?label=commits&style=for-the-badge) ![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/VeselaVideva/pet-shelter/master?style=for-the-badge)

Angular project for SoftUni's JS Web Developer learning path.

### Live Demo
[https://pet-shelter-angular.web.app/](https://pet-shelter-angular.web.app/)

### Tech Stack

- Angular CLI 13.2.5
- Angular Material
- Firebase 9.6.8 - authentication, hosting, storage, firestore, realtime database
- Typescript 4.6.2
- RxJS 7.5.0
- [@ngneat/hot-toast](https://www.npmjs.com/package/@ngneat/hot-toast)
- [@ngneat/until-destroy](https://www.npmjs.com/package/@ngneat/until-destroy)
- [Angular Share Buttons](https://www.npmjs.com/package/ngx-sharebuttons)
- GitHub
- GitHub Desktop

### Useful information
I'm deploying on a site with a custom name, not the default domain name that Firebase provides, so in every deploy the site name must be specified:`firebase deploy --only hosting:pet-shelter-angular`

### Public (guests)

- page Home (click on logo) - shows all pets from the database (1st dynamic page)
- page Sign Up (Register) - added routh guard, so logged-in users can't access the page
- page Sign In (Login) - added route guard, so logged-in users can't access the page
- page 404 - when user enters an invalid url, he's redirected to this page (contains SVG image)

### Private (users)

- page Add pet - added route guard, so only logged-in users can access the page, added data validation and error handling (2nd dynamic page)
- page Details - each pet card has a button for reaching the Details page which contains more information about the pet. In this page the fosterer of the animal (the user who added the animal to the database) dan update pet's photo, age and description, or to delete the pet from the database. (3rd dynamic page)
- Edit & Delete buttons on Details page - visible only for users which have added the pet to the database (foster home providers)
- page Profile - each user has a profile page which is editable - user can add his profile photo, can update it and also can update his user data, all data is stored in Firestore collections (4th dynamic page), each user has a list of his fostered pets on his profile page
- Logout button in the header user menu is visible only to logged-in users

### Bonuses

- App is deployed with Firebase hosting
- Firebase storage is used as a file storage for user profile photos
- RxJS used for reactive programming using Observables
- Used 3rd party API for getting user's IP address - [https://jsonip.com/](https://getjsonip.com/#docs)
- Used 3rd party API for getting user's geolocation information - [https://app.ipgeolocation.io/](https://app.ipgeolocation.io/)
- Implementation of Scroll-to-top button
- Media queries CSS for Mobile, Tablet, and Desktop devices
- I've used SVG images in 2 places

### Author
Vesela Videva - [https://videva.dev/](https://videva.dev/)
