# Blog mutations project implementation
This branch contains the blog mutations project [implementation](https://github.com/WebDevSimplified/Next.js-Simplified/tree/main/26-27-blog-mutations/before) from **App - Data Mutation** section of [React Simplified - Next.js](https://courses.webdevsimplified.com/view/courses/react-simplified-next-js/2344759-app-data-mutation/7523595-26-blog-mutation-introduction) course.

## Local Setup Instructions
1. `npm install` - This will install all the dependencies for the project.
2. `npx prisma db push` - This will create the database and all the tables.
3. `npx prisma db seed` - This will seed the database with data that is very similar to the data from the API.
4. You may need to run `npx prisma generate` if you get any errors about missing types. If this doesn't fix the typing errors just run the command `TypeScript: Restart TS Server` in the VSCode command palette or restart VSCode.
5. `npm run dev` - This will start the development server. There is no need for an API server anymore.
