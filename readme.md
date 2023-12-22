# Course-Review Backend App

## Table of Contents

- [Prerequisites](#Prerequisites)
- [Description](#Description)
- [Live Site](#LiveSite)
- [Installation](#Installation)
- [Environment Configuration](#EnvironmentConfiguration)
- [Running the Application](#RunningtheApplication)
- [Scripts](#Scripts)
- [Dependencies](#Dependencies)
- [Dev Dependencies](#DevDependencies)
- [Course review diagram](#Coursereviewdiagram)
- [Course Review API Documentation](#CourseReviewAPI Documentation)

## Prerequisites

Ensure you have the following installed on your system:

- Node Version: v20.9.0

## Description

Course Review is a insightful backend application designed to smooth
the management and optimization of online E-Education platforms.
This application intuitive tools for creating and updating
courses seamlessly.

Feel free to explore the live site and experience the various functionalities offered by the below link.

## Live Site

You can access the live version of the website at [Course Review](https://course-review-neon.vercel.app/).

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone : https://github.com/Porgramming-Hero-web-course/l2b2a3-course-review-mrnayem2026.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Course Review
   ```
3. Install project dependencies:
   ```bash
   npm install
   ```

## Environment Configuration

1. Create a `.env` file in the root directory based on the provided `.env.example`.
2. Configure the environment variables as needed for your local setup.
   NODE_ENV = **\*\*\***
   PORT = **\*\***
   DB_USER= **\*\***
   DB_PASS= **\*\*\***
   DATABASE_URL =**\*\***
   SALT_ROUNDS =**\*\***
   BASEURL =**\*\***

## Running the Application

- To start the application in production mode:

  ```bash
  npm run start:prod
  ```

  This command transpiles the TypeScript code and starts the server.

- To start the application in development mode with hot reloading:
  ```bash
  npm run start:dev
  ```
  This command utilizes `ts-node-dev` for automatic transpilation and restarts the server upon file changes.

## Scripts

The project provides additional scripts to perform various tasks:

- `build`: Transpile TypeScript code to JavaScript.
- `lint`: Lint the source files using ESLint.
- `lint:fix`: Lint and automatically fix linting errors using ESLint.
- `prettier`: Format source files using Prettier.
- `prettier:fix`: Format and automatically fix formatting errors using Prettier.

## Dependencies

The project relies on the following dependencies:

- [@types/bcrypt](https://www.npmjs.com/package/@types/bcrypt) v5.0.2
- [@typescript-eslint/typescript-estree](https://www.npmjs.com/package/@typescript-eslint/typescript-estree) v6.12.0
- [bcrypt](https://www.npmjs.com/package/bcrypt) v5.1.1
- [cors](https://www.npmjs.com/package/cors) v2.8.5
- [dotenv](https://www.npmjs.com/package/dotenv) v16.3.1
- [express](https://www.npmjs.com/package/express) v4.18.2
- [mongoose](https://www.npmjs.com/package/mongoose) v8.0.1
- [zod](https://www.npmjs.com/package/zod) v3.22.4
- [zod-validation-error](https://www.npmjs.com/package/zod-validation-error) v2.1.0

## Dev Dependencies

The project uses the following dev dependencies:

- [@types/cors](https://www.npmjs.com/package/@types/cors) v2.8.17
- [@types/express](https://www.npmjs.com/package/@types/express) v4.17.21
- [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) v6.12.0
- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) v6.12.0
- [eslint](https://www.npmjs.com/package/eslint) v8.54.0
- [prettier](https://www.npmjs.com/package/prettier) v3.1.0
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev) v2.0.0
- [typescript](https://www.npmjs.com/package/typescript) v5.3.2

## Course review diagram

![Screenshot](/img/course%20review%20diagram.png)

# Course Review API Documentation

## 1. Create a Course

**Method:** `POST`

**Endpoint:** `https://course-review-neon.vercel.app/api/course`

**Request Body:**

```json
{
  "title": "Sample Course",
  "instructor": "Jane Doe",
  "categoryId": "123456789012345678901234",
  "price": 49.99,
  "tags": [
    {
      "name": "Programming",
      "isDeleted": false
    },
    {
      "name": "Web Development",
      "isDeleted": false
    }
  ],
  "startDate": "2023-01-15",
  "endDate": "2023-03-14",
  "language": "English",
  "provider": "Tech Academy",
  "details": {
    "level": "Intermediate",
    "description": "Detailed description of the course"
  }
}
```

## 2. Get All Courses

**Method:** `GET`

**Endpoint:** `https://course-review-neon.vercel.app/api/courses`

**Query Parameters:**

- `page` (optional)
- `limit` (optional)
- `sortBy` (optional)
- `sortOrder` (optional)
- `minPrice` (optional)
- `maxPrice` (optional)
- `tags` (optional)
- `startDate` (optional)
- `endDate` (optional)
- `language` (optional)
- `provider` (optional)
- `durationInWeeks` (optional)
- `level` (optional)

## 3. Create a Category

**Method:** `POST`

**Endpoint:** `https://course-review-neon.vercel.app/api/categories`

**Request Body:**

```json
{
  "name": "SaaS"
}
```

## 4. Get All Categories

**Method:** `GET`

**Endpoint:** `https://course-review-neon.vercel.app/api/categories`

## 5. Create a Review

**Method:** `POST`

**Endpoint:** `https://course-review-neon.vercel.app/api/reviews`

**Request Body:**

```json
{
    "courseId": "658406fca3cb2b7854290175",
    "rating": 5,
    "review": "Great course!"
}
```

## 6. Update a Course (Partial Update with Dynamic Update)

**Method:** `PUT`

**Endpoint:** `https://course-review-neon.vercel.app/api/courses/:courseId`

**Request Body:** (Include only the fields to be updated)

```json
{
    "title": "Updated Title",
    "instructor": "New Instructor",
    "categoryId": "658406fca3cb2b7854290175",
    "price": 59.99,
    "tags": [
        {
            "name": "Programming",
            "isDeleted": true
        },
        {
            "name": "Web Development",
            "isDeleted": false
        }
    ],
    "startDate": "2023-02-01",
    "endDate":"2023-03-14",
    "language": "Spanish",
    "provider": "Code Masters",
    "durationInWeeks": 6,
    "details": {
        "level": "Intermediate",
        "description": "Detailed description of the course"
    }
}
```

## 7. Get Course by ID with Reviews

**Method:** `GET`

**Endpoint:** `https://course-review-neon.vercel.app/api/courses/:courseId/reviews`

## 8. Get the Best Course Based on Average Review (Rating)

**Method:** `GET`

**Endpoint:** `https://course-review-neon.vercel.app/api/course/best`

Feel free to reach out for any clarification or additional information.
