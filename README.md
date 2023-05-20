# Marvel Characters App 

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/lluisgustavo/marvel_characters_app/blob/main/README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/lluisgustavo/marvel_characters_app/blob/main/README.pt-br.md)

This project is a practical test for a React front-end development position at Oystr Robôs. The goal of this application is to create a minimally responsive web app that lists and allows searching for Marvel characters using the Marvel API.

## Table of Contents
- [Project Objectives](#project-objectives)
- [Directives](#directives)
- [Tech](#tech)
- [Setup/Getting Started](#setupgetting-started)  

## Project Objectives
The objective of this project is to assess skills in React.js development by creating a responsive application that interacts with the Marvel API. The application should allow users to list and search for Marvel characters and view their details. The task is to implement the character listing functionality with pagination and search features, as well as the character details view. The project should demonstrate proficiency in React.js, including data fetching from an API, handling user interactions, and designing responsive layouts, following best practices in React.js development. 

## Directives
### Getting Started
- To create the app, use the API provided by Marvel.
- Create a developer account and consult the documentation.
- API Link -> https://developer.marvel.com/

### Listings:
#### GET /v1/public/characters

  - Use this endpoint to list the characters.
  - The listing should display at least 10 items per page.
  - Implement pagination and search functionality for the listing.
  - Each character item should allow displaying more details.
  - When selecting a character, show additional information about them in the "Details" section.
  - You have freedom in designing the layout for this screen.

### Details:
#### GET /v1/public/characters/{characterId}

  - Use this endpoint to retrieve and display the details of a character.
  - Show the details of the selected character.
  - In addition to the information provided by the above endpoint, try to include at least one more piece of information about the character. Check the API documentation for the available information related to a character.
  - You have freedom in designing the layout for this screen.

## Tech   
- [Next.js](https://nextjs.org/): A popular framework for building React applications with server-side rendering, static site generation, and more.
- [React](https://react.dev/): A JavaScript library for building user interfaces.
- [Tailwind CSS](https://tailwindcss.com/): A highly customizable CSS framework that provides utility classes to rapidly build UI components.
- [Axios](https://axios-http.com/): A promise-based HTTP client for making API requests from JavaScript or TypeScript.
- [MD5](https://github.com/pvorb/node-md5): A JavaScript library for generating MD5 hashes, often used for encryption and checksums.
- [React Slick](https://react-slick.neostack.com/): A carousel component for React applications, used for creating sliders and image carousels.

## Setup/Getting Started
To create the app, we will be utilizing the Marvel API. Follow the steps below to set up your development environment:

1. Create a developer account at [Marvel Developer Portal](https://developer.marvel.com/).
3. Rename `.env.example` file to `.env`
2. Obtain the API keys required for accessing the Marvel API.
4. Replace `NEXT_PUBLIC_MARVEL_PUBLIC_KEY` and `NEXT_PUBLIC_MARVEL_PRIVATE_KEY` to the keys provided by marvel's developer portal.
5. Clone this repository to your local machine.
6. Install the necessary dependencies by running the following command:

```
npm install
```

7. You can run the project by executing:

```
npm start
```

8. You can also run the development server by executing:


```
npm run dev
```

6. Access the app at [http://localhost:3000](http://localhost:3000).
 