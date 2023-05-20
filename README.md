# Marvel Characters App 

This project is a practical test for a React front-end development position at Oystr Robôs. The goal of this application is to create a minimally responsive web app that lists and allows searching for Marvel characters using the Marvel API.

## Table of Contents
- [Project Objectives](#project-objecives)
- [Tech](#tech)
- [Setup/Getting Started](#setupgetting-started) 

## Project Objective
The objective of this project is to assess skills in React.js development by creating a responsive application that interacts with the Marvel API. The application should allow users to list and search for Marvel characters and view their details. The task is to implement the character listing functionality with pagination and search features, as well as the character details view. The project should demonstrate proficiency in React.js, including data fetching from an API, handling user interactions, and designing responsive layouts, following best practices in React.js development.


  1. Marvel Developer Account: Create a developer account on the Marvel Developer Portal to obtain the necessary API credentials.

  2. API Base URL: Use the base URL provided by the Marvel API for all API requests.

  3. Listing Characters: Fetch the list of characters using the following endpoint:
      Endpoint: GET /v1/public/characters
      Use pagination parameters to control the number of items per page and navigate through the results.

  4. Character Details: Retrieve the details of a specific character using the following endpoint:
      Endpoint: GET /v1/public/characters/{characterId}
      Replace {characterId} with the actual ID of the character you want to fetch.
      
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
