# Read only blog project implementation
This branch contains the read only blog project [implementation](https://github.com/WebDevSimplified/Next.js-Simplified/tree/main/09-10-read-only-blog/before) of **App - Getting Started section** of [React Simplified - Next.js](https://courses.webdevsimplified.com/view/courses/react-simplified-next-js/2324329-app-getting-started/7393973-09-read-only-blog-introduction) course.

## Local Setup Instructions
1. To run this project implementation on your local download the files.
2. This is a API based project, a local json based API is being used to fetch the data. So first we will need to setup the API on local, to setup the API follow the below steps:
   - Open the terminal and navigate to the `api` folder present at the root of project.
   - Execute the command `npm install` and after that execute `npm run dev` command.
   -  This should start up an API on http://localhost:3001 and verify that you are able to access the api.
3. Now to setup the frontend(client) of this project follow the below steps:
   - Open the terminal and navigate to the `client` folder present at the root of project.
   - Execute the command `npm install` and after that execute `npm run dev` command.
   - Open the localhost url returned in the browser to view the project.

Note: API response has been slowed down by 2 seconds intentionally in order to show the loading skeletons.