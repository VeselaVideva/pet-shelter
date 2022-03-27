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
- GitHub
- GitHub Desktop

### Public (guests)

- page Home (click on logo) - shows all pets from the database
- page Sign Up (Register) - added routh guard, so logged-in users can't access the page
- page Sign In (Login) - added route guard, so logged-in users can't access the page

### Private (users)

- page Add pet - added route guard, so only logged-in users can access the page
- **TODO:** Edit & Delete buttons (visible only for users which have added the pet to the database)
- page Profile (each user has a profile page... **TODO:** which shows a list with his animals added for adoption)
- Logout button in the header user menu is visible only to logged-in users

### Bonuses

- App is deployed with Firebase hosting
- Firebase storage is used as a file storage for images
- RxJS used for reactive programming using Observables 
- Write media queries CSS for Mobile, Tablet, and Desktop devices (... in progress)

### Author
Vesela Videva - [https://videva.dev/](https://videva.dev/)
