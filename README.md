# Advanced Routing Techniques
## Topics covered in this section of course
1. Advanced Routing
	- Templates
	- Route Groups
	- Parallel Routes
	- Intercepting Routes
	- Route Handlers:
2. Pages Directory
	- Your First Next.js Pages Directory App (Pages directory nextjs app setup)
	- Routing
	- Metadata
 
## Learnings
### 1.1 Templates
In Next.js, both `template` and `layout` are used to structure your pages, but they serve different purposes and behave differently in terms of how they render content.
1. **`layout`**
	-   **Purpose**: The `layout` component is used to wrap a group of pages with a common structure or design, such as headers, footers, sidebars, or any other repeated UI elements.
	-   **Persistent Rendering**: The key feature of a `layout` is that it persists between page navigations. This means that when a user navigates from one page to another that shares the same layout, the layout component is not re-rendered. Instead, only the content inside the layout is updated. This results in a faster and smoother navigation experience because the common UI elements do not need to be reloaded.
	-   **Example**: If you have a blog with a sidebar and a header that stays the same across all blog posts, you would use a `layout` to wrap all blog post pages. The layout will only render once, and only the content inside it (e.g., the blog post content) will change as the user navigates.
		```ts
		// app/blog/layout.tsx

		export default function BlogLayout({ children }: { children: React.ReactNode }) {
		  return (
		    <div>
		      <Header />
		      <Sidebar />
		      <main>{children}</main>
		      <Footer />
		    </div>
		  )
		}
		``` 
2. **`template`**
	-   **Purpose**: The `template` component is similar to `layout` in that it also wraps a group of pages, but with a significant difference in behavior. Unlike `layout`, a `template` re-renders every time the user navigates to a new page within the same template.
	-   **New Render on Navigation**: When navigating between pages that share the same `template`, the entire `template` component will be re-rendered. This is useful when you want to reset certain states or animations, or when you need the template to be re-applied each time the user navigates to a new page.
	-   **Example**: If you have a series of pages in a multi-step form, and you want each step to reset certain UI elements or animations, you would use a `template` to wrap these pages. Each step will trigger a full re-render of the `template`.
		```ts
		// app/form/[step]/template.tsx

		export default function FormTemplate({ children }: { children: React.ReactNode }) {
		  return (
		    <div className="form-wrapper">
		      <FormHeader />
		      <div className="form-content">{children}</div>
		    </div>
		  )
		}
		``` 
3. **Key Differences**:
	-   **Rendering Behavior**:
	    -   `layout`: Persistent across navigation; only re-renders the inner content, leading to faster transitions and a consistent UI.
	    -   `template`: Re-renders completely with each navigation, which can reset state or re-apply effects, useful for steps in a process or when you want to reset the UI on navigation.
	-   **Use Cases**:
	    -   **Use `layout`** when you need a consistent UI shell that should not re-render on every page transition (e.g., a persistent navigation menu, header, footer).
	    -   **Use `template`** when you need a page wrapper that should reset or re-render on every page navigation (e.g., multi-step forms, pages that require fresh animations or state resets).

Understanding when to use `layout` vs. `template` helps you create efficient, user-friendly applications with Next.js, optimizing the rendering behavior to match your specific needs.
### 1.2 Route Groups
Route Groups in Next.js allow you to organize your application’s routes more efficiently and handle complex layout requirements by creating multiple root layouts and separate layouts for different sections of your app. Here’s how they work:
1. **Organizing Routes with Route Groups**
	-   **Purpose**: Route groups are primarily used to organize pages within your Next.js application and manage complex layout needs. This is especially useful when different sections of your application require distinct layouts or when you want to logically group related pages together without affecting the URL structure.
    -   **Usage**: To create a route group, you place the routes within a folder that you want to group together. The name of the folder begins with `(` and ends with `)`, like `(groupName)`. This folder acts as an organizational tool without affecting the URL path.
		```
		app/
		├── (admin)
		│   ├── dashboard/
		│   ├── users/
		├── (marketing)
		│   ├── about/
		│   ├── contact/
		``` 
2. **Multiple Root Layouts**
	-   **Separate Layouts**: When using route groups, you can define separate root layouts for each group. This is beneficial if different sections of your application require distinct layouts. For instance, your admin dashboard may have a different root layout compared to the public-facing pages.
	-   **Root Layout Requirement**: If you’re using multiple root layouts, each route group should have its own root layout. This ensures that Next.js applies the correct layout to the routes within that group.
		```ts
		// app/(admin)/layout.tsx
		export default function RootLayout({ children }: { children: React.ReactNode }) {
		  return (
     		<html>
		      <body>
		        <div>
		          <AdminHeader />
		          {children}
		          <AdminFooter />
		        </div>
		      </body>
		    </html>
		  )
		}

		// app/(marketing)/layout.tsx
		export default function RootLayout({ children }: { children: React.ReactNode }) {
		  return (
		    <html>
		      <body>
		        <div>
		          <MarketingHeader />
		          {children}
		          <MarketingFooter />
		        </div>
		      </body>
		    </html>
		  )
		}
		``` 
3. **Simple Layouts for Route Groups**
	-   **Non-Root Layouts**: Just like with regular routes, you can create simple layouts within route groups to apply a layout to a specific group of pages. This layout will only apply to the routes within that specific group.    
	-   **Organizational Use**: Sometimes, you may not need distinct layouts but just want to organize pages logically. In this case, you can use route groups simply for organization without creating a unique layout for them.
		```ts
		// app/(marketing)/about/layout.tsx
		export default function AboutLayout({ children }: { children: React.ReactNode }) {
		  return (
		    <div>
		      <AboutSidebar />
		      <main>{children}</main>
		    </div>
		  )
		}
		``` 
4. **Avoiding URL Conflicts**
	-   **Watch for Conflicts**: When using route groups, be careful not to accidentally create pages in different groups that point to the same URL. Since route groups don’t alter the URL structure, if two pages in different groups have the same path, it can cause conflicts and unexpected behavior.
5. **Private Folders Using Underscore (`_`)**
	-   **Private Folders**: Sometimes you may want to organize your project with folders that do not directly map to routes. In Next.js, you can prefix a folder with an underscore (`_`) to indicate that it is private. Next.js will not treat these folders as part of the routing structure.
     -   **Example**: If you have utility files or components that are specific to a certain group but shouldn’t be part of the public routing, you can place them in an underscored folder.
	```bash
	app/
	├── (admin)
	│   ├── _utils/
	│   ├── dashboard/
	``` 

By utilizing route groups in Next.js, you gain more control over your project’s structure and layout management. Whether you need to organize complex layouts or simply want to keep your codebase neat, route groups offer a powerful way to structure your Next.js application.

### 1.3 Parallel Routes
Parallel routing in Next.js is a powerful feature that allows developers to render different sections of a page independently, each with its own loading and error states. This is particularly useful when you want to improve user experience by handling multiple asynchronous operations on the same page separately. Here's how it works:

1. **What is Parallel Routing?**
	-   **Purpose**: Parallel routing enables different sections of a single page to have their own independent loading, error, and content states. This means that even if one section of the page is still loading or encounters an error, other sections can still be rendered and displayed to the user.
	-   **Use Case**: It is particularly useful when different parts of a page fetch data from different sources, and you want to manage their loading and error states separately without affecting the entire page.
    
2. **How to Implement Parallel Routing?**
	-   **Directory Structure**: To implement parallel routing, you need to create separate folders for each section of your page. Each folder should have its own loading, error, and page components. The folders are prefixed with `@` to indicate that they are part of a parallel route.
	-   **Parent Layout Setup**: In the parent layout file (`layout.tsx`), you pass these sections as parameters after the `children` parameter. This setup allows Next.js to treat each section as an independent route, even though they are part of the same page.
		```bash
		app/
		├── layout.tsx
		├── @sidebar/
		│   ├── loading.tsx
		│   ├── error.tsx
		│   ├── page.tsx
		├── @content/
		│   ├── loading.tsx
		│   ├── error.tsx
		│   ├── page.tsx
		``` 
	- **Example**:
		```ts
		// layout.tsx
		export default function RootLayout({
		  children,
		  sidebar,
		  content,
		}: {
		  children: React.ReactNode
		  sidebar: React.ReactNode
		  content: React.ReactNode
		}) {
		  return (
		    <div>
		      <aside>{sidebar}</aside>
		      <main>{content}</main>
		      {children}
		    </div>
		  )
		}
		``` 
3. **How Parallel Routing Works Behind the Scenes**
	-   **Independent Rendering**: When Next.js encounters parallel routes, it treats each section as an independent unit. Each unit handles its own data fetching, loading states, and error handling. This independence ensures that one slow or failing section does not affect the rest of the page.
    -   **Routing and Rendering**: Behind the scenes, Next.js manages the routing and rendering of each section separately, while still combining them into a cohesive page for the user. This modular approach allows for better performance and a more responsive user experience.
4. **Benefits of Parallel Routing**
	-   **Separate State Management**: One of the biggest benefits is the ability to manage loading and error states for different sections independently. This can significantly enhance user experience, especially on complex pages with multiple data sources.
    -   **Conditional Rendering**: Parallel routing also makes it easier to conditionally render different sections of a page. Since each section is treated independently, you can decide whether or not to render a section based on its own conditions without affecting the rest of the page.
    

5. **Issues with Nested Child Routes in Parallel Routing**
	-   **404 Errors on Hard Refresh**: A common issue with parallel routing is that nested child routes of a parent route can lead to 404 errors on hard refresh or direct URL navigation. This occurs because Next.js may not correctly resolve the nested routes when they are part of parallel routing.
    -   **Workarounds**:
	    -   **Manually Create Subfolders**: One workaround is to manually create subfolders within each parallel route folder. This ensures that Next.js can correctly resolve the nested routes.
	    -   **Default Content with `default.tsx`**: Another approach is to create a `default.tsx` file in the nested route folder to render default content if there is nothing else to render. However, note that `default.tsx` uses the parent loading component, not the parallel route components' loading.
	    -   **Catch-All Route with Dynamic Params**: To avoid this, you can also create a catch-all route with dynamic route parameters. This route can handle all possible nested routes and ensure that they render correctly even on hard refresh or direct URL navigation.

Parallel routing is a powerful feature in Next.js that, when implemented correctly, can greatly enhance the flexibility and performance of your applications. However, it's important to be aware of potential issues with nested routes and have strategies in place to mitigate them.
### 1.4 Intercepting Routes
Intercepting routes in Next.js allows you to modify the behavior of route navigation in your application. Instead of simply navigating to a new page when a link is clicked, you can "intercept" that navigation and render a different page or component. 
1. **What Are Intercepting Routes?**
	- An intercepting route stands between the user's click on a link and the intended destination, redirecting them to a different page or component. 
	- It acts similarly to a redirect but is specific to soft navigations (navigations triggered by link clicks or programmatic routing, not hard refreshes).
2. **How to Create an Intercepting Route**
	- To create an intercepting route, you'll use a specific folder naming convention in your `app` directory. Here's how it works:
	1.  **Create a Folder for the Intercepting Route:**
        -   Start by creating a folder with a special naming syntax using parentheses. Inside the parentheses, use a dot wrapped in parenthesis `(.)` followed by the route you want to intercept.
	    -   For example, if you want to intercept navigation to the `/post` route, you would create a folder named `(.)post`.    
		    ```
		    app
		    ├── (.)post
		    │   └── page.tsx
		    ```     
	2.  **Create a Page Component:**    
	    -   Inside the intercepting route folder, create a `page.tsx` file. This file will define what gets rendered when the intercept is triggered.    
		    ```ts
		    // app/(.)post/page.tsx
		    
		    export default function PostsInterceptPage() {
		      return <h1>Posts Intercept</h1>;
		    }
		    ```     
3. **Example: Basic Intercepting Route**
	- We have a simple Next.js application with the following pages:
		```
		- `/`
		- `/team`
		- `/team/nested`
		- `/about`
		- `/post`
		- `/post/[postId]`
		```
	- We have to intercept navigation to the `/post` route and show a custom page instead. Here's how we can implement it:
		1.  **Create the Intercepting Route:**
		     Create a folder named `(.)post` inside the `app` directory.		     
		    ```
		    app
		    ├── (.)post
		    │   └── page.tsx
		    ```     
		2.  **Define the Intercepting Page:**    
		    ```ts
		    // app/(.)post/page.tsx
		    
		    export default function PostsInterceptPage() {
		      return <h1>Posts Intercept</h1>;
		    }
		    ```     
		3.  **Navigate to the Post Page:**
        When we navigate to the `/post` page by clicking a link, the intercepting route will take over, and we will see the "Posts Intercept" page instead of the default `/post` page.
4. **Advanced Usage: Nested Intercepts**
We can also intercept routes at deeper levels or in specific folders. For example, if you want to intercept the `/about` page only when navigating from the `/post` route, we can do the following:
	1.  **Create the Intercepting Route in the Post Folder:**   
	    ```
	    app
	    ├── post
	    │   ├── (..)about
	    │   │   └── page.tsx
	    ```         
	2.  **Define the Intercepting Page:**    
    ```ts
    // app/post/(.)about/page.tsx    
    export default function AboutInterceptPage() {
      return <h1>About Intercept</h1>;
    }
    ``` 
	3.  **Navigate to the About Page from the Post Route:**
    When we click a link to the `/about` page while inside the `/post` route, the intercepting route will take over, displaying the "About Intercept" page.
5.  **Combining with Parallel Routes**
	- Intercepting routes become even more powerful when used with parallel routes. You can conditionally render different sections of a page based on the intercept, creating dynamic and complex user experiences.
	- For example, you could have a scenario where a certain section of a page changes based on the user's navigation path, while the rest of the page remains consistent. By combining intercepting routes with parallel routes, you can achieve this behavior seamlessly.
6. **Summary**
	- Intercepting routes in Next.js allow us to control the navigation flow within our application, rendering different content based on user interactions. 
	- By using the special folder syntax, we can create intercepts that change the behavior of specific routes, especially when combined with parallel routes. 
	- This technique adds a layer of flexibility and dynamism to your Next.js applications, making it easier to manage complex navigation scenarios.

### 1.4 Route Handlers
Route handlers in Next.js offer a low-level way to create custom routes for handling HTTP requests, making them particularly useful for creating APIs, such as a JSON API. Unlike standard React server components, which render HTML, route handlers are designed to handle different HTTP methods (like GET, POST, PUT, DELETE) and return responses directly, typically in formats like JSON.
1. **Setting Up a Basic Route Handler**
	- To create a route handler, you replace the typical `page.tsx` file with a `route.tss` file in the desired route directory. 
	- For example, if you want to create an API endpoint at `/post`, you would create a `post` folder and add a `route.tss` file inside it.
		```
		/pages
		  /post
		    route.tsx` 
		```
2. **Defining HTTP Methods**
	- In the `route.tss` file, you can define functions that correspond to different HTTP methods. The most common methods are `GET` and `POST`, but you can define others like `PUT`, `PATCH`, and `DELETE`.
	- Here's a basic example of a `route.tsx` file with a `GET` and a `POST` handler:
		```ts
		// route.tsx
		export async function GET() {
		  // Handle GET request
		  return Response.json({ message: 'GET request successful' })
		}

		export async function POST(request: NextRequest) {
		  // Handle POST request
		  const data = await request.json(); // Parse JSON body
		  return Response.json(data)
		}
	``` 
4. **Caching and Dynamic Behavior**
	- By default, if your route handler only includes a `GET` method with static content (i.e., no dynamic data like request headers or URL parameters), it might be cached as a static page. 
	- However, adding dynamic behavior, such as handling `POST` requests, changes the route to be dynamic, meaning it won’t be statically cached and will execute every time a request is made.
5. **Dynamic Routes**
	- You can create dynamic routes by including a dynamic parameter in the folder name, such as `[postId]` for an individual post. Inside the route file, you can access this dynamic parameter using the `params` object:
		```ts
		export async function GET(request: NextRequest, { params }: { params: { postId: string } }) {
		  const postId = params.postId;
		  const post = await getPostById(postId); // Fetch the post from your data source
		  Response.json(post)
		}
		``` 
5. **Important Considerations**
-   **No Page and Route Together**: You cannot have both a `page.tsx` and a `route.ts` file in the same directory as they would conflict. It's common to separate API routes into a dedicated `api` folder to avoid conflicts with page routes.
-   **API-Specific Use**: Route handlers are mainly used for API creation and are more suited for backend logic rather than frontend rendering, where server actions might be preferred.
### 2.1 Your First Next.js Pages Directory App (Pages directory nextjs app setup)
Setting up a basic Next.js application using the **pages** directory for routing is straightforward and shares similarities with setting up an App Router-based Next.js application. Here's how you can create and set up a Next.js application using the pages directory:
1.  **Creating the Application**:    
    -   Start by running the command `npx create-next-app` in your terminal. You can specify the current directory by adding a period (`.`) after the command.
    -   During the setup, you'll be prompted to choose whether you want to use TypeScript, ESLint, Tailwind CSS, etc. You should configure these according to your needs.
    -   Crucially, when asked if you want to use the App Router, select **"No"**. This will ensure that the project uses the **pages** directory instead.
2.  **Project Structure**:    
    -   After the setup, you'll notice a structure similar to an App Router project, with one significant difference: the presence of a **pages** directory instead of an **app** directory.
    -   The **pages** directory is the core of your routing system in this setup. Each file in this directory corresponds to a route in your application.
3.  **Page-based Routing**:    
    -   Unlike the App Router's folder-based routing, the **pages** directory uses file-based routing. For example, `index.tsx` within the pages directory serves as the root route of your application (i.e., `/`).
    -   You can add more pages by simply creating new files in this directory, and they will automatically become available as routes. For example, a file named `about.tsx` would create a route at `/about`.
4.  **Layout and Document Files**:
    -   In the pages directory setup, you will encounter two key files: `app.tsx` and `document.tsx`.
    -   The `app.tsx` file functions similarly to a global layout component, wrapping every page in your application. It’s where you can add global context providers or layout components that should appear on all pages.
    -   The `document.tsx` file is more akin to setting up the HTML shell of your application, similar to the root layout in the App Router. You typically won’t need to modify this file much, but it’s where you can define things like `<head>` tags or a custom HTML structure.
5.  **API Routes**:    
    -   The pages directory includes an **API** folder where you can define your API routes. These function similarly to the route handlers in the App Router but are contained within this specific folder.
6.  **No Server vs. Client Component Distinction**:    
    -   One significant difference between the pages directory and the App Router is the absence of server versus client components. In the pages directory, components behave like typical React components, simplifying the development process for those familiar with standard React.

Overall, setting up a Next.js application using the pages directory is straightforward and closely mirrors traditional React development. This makes it a simpler and more familiar approach for developers transitioning from React to Next.js, especially when working with older projects or legacy code.

### 2.2 Routing
When working with a pages-based routing system in Next.js, routing is straightforward and based on the file structure within the `pages` directory. Here's how it works:
1.  **File-Based Routing**: 
	- In the pages-based routing system, each file in the `pages` directory corresponds to a route in your application. 
	- For instance, if you create a `test.tsx` file within the `pages` directory, navigating to `/test` in your browser will render that page. 
	- Similarly, the `index.tsx` file represents the root route (`/`) of your application. This is a key difference from the app router system, which is folder-based.
2.  **Nested Routes**: 
	- You can create nested routes by organizing files within folders. 
	- For example, if you have a `folder` directory with an `index.tsx` file inside it, visiting `/folder` will render the content of that file. 
	- You can further nest routes by adding more files within the `folder` directory, such as `test.tsx`, which would render when navigating to `/folder/test`.
3.  **Dynamic Routes**: 
	- To create dynamic routes, you can use square brackets in the file or folder names. 
	- For example, creating a `[id].tsx` file inside a folder will allow you to capture dynamic segments in the URL, such as `/folder/123`. 
	- Inside this file, you can access the dynamic parameter (`id` in this case) using the `useRouter` hook from `next/router`. This hook allows you to extract the query parameters, including dynamic route segments.
4.  **Duplicate Routes Warning**: 
	- Next.js will warn you if you create routes that conflict, such as having both `folder.tsx` and a `folder` directory with an `index.tsx` file.
	-  This is because they would both map to the same URL (`/folder`). To avoid this, ensure you organize your files and folders to prevent such conflicts.
5.  **Linking Between Routes**: 
	- Navigating between routes is simple with the `Link` component from `next/link`. This works the same as in the app router system, allowing you to link to other pages within your application easily.
6.  **No Server vs. Client Components**: 
	- Unlike the app router system, where you need to distinguish between server and client components, the pages-based system does not have this distinction. This makes it more similar to a standard React setup, which can simplify development if you're accustomed to working with React.
7.  **Simplified Routing**: 
	- The routing in the pages directory is as complex as it gets. There are no additional features like loading or error pages to configure, making it a more straightforward system to work with, especially for developers transitioning from traditional React projects.
    

In summary, routing in a pages-based Next.js application is intuitive and file-based, making it simple to create both static and dynamic routes. You organize your routes by placing files and folders in the `pages` directory, and Next.js automatically maps them to the appropriate URLs

### 2.3 Metadata
In a pages-based Next.js application, handling metadata such as titles and meta descriptions involves using the `Head` component from `next/head`. This approach is different from the app router, which uses more integrated metadata management. Here’s a detailed explanation based on the lecture notes:

1. **Understanding the `Head` Component**
	- In the pages-based routing system of Next.js, there is no central metadata object like in the app router.
	- Instead, metadata is managed using the `Head` component from the `next/head` package. This component allows you to manipulate the contents of the `<head>` tag in your HTML.
2. **Basic Usage of `Head`**
	- You can use the `Head` component to set various metadata properties such as the page title, meta descriptions, and more. Here’s a basic example:
		```ts
		// pages/index.tsx
		import Head from 'next/head';

		export default function Home() {
		  return (
		    <>
		      <Head>
		        <title>This is the title</title>
		      </Head>
		      <h1>Home Page</h1>
		    </>
		  );
		}
		``` 
	- **Explanation:**
		-   The `<title>` tag inside the `Head` component sets the title of the page.
		-   This title will be displayed in the browser tab and in search engine results.
3. **Placement and Nesting of `Head`**
	- The `Head` component can be placed anywhere in your component tree, and it will affect the HTML `<head>` tag for that page. This means you can include it in different components and pages, and it will still modify the head section of the HTML document.
	- **Example of Nested `Head` Components:**
		```ts
		// pages/index.tsx
		import Head from 'next/head';

		function NestedComponent() {
		  return (
		    <Head>
		      <title>This is the title 2</title>
		    </Head>
		  );
		}

		export default function Home() {
		  return (
		    <>
		      <Head>
		        <title>This is the title</title>
		      </Head>
		      <NestedComponent />
		      <h1>Home Page</h1>
		    </>
		  );
		}
		``` 
	- **Behavior:**
		-   The `title` tag defined in `NestedComponent` will overwrite the one defined directly in `Home`.
		-   Only the last `title` defined in the head will be used. If you inspect the HTML, you’ll see only the latest title being rendered.
4. **Handling Metadata Conflicts**
	- When dealing with metadata like meta descriptions, you may encounter conflicts if multiple tags are defined with the same property. For instance:
		```ts
		// pages/index.tsx
		import Head from 'next/head';

		export default function Home() {
		  return (
		    <>
		      <Head>
		        <meta name="description" content="Description 1" />
		      </Head>
		      <Head>
		        <meta name="description" content="Description 2" />
		      </Head>
		      <h1>Home Page</h1>
		    </>
		  );
		}
		``` 
	- **Issue:** Both meta descriptions will appear in the HTML, which is not ideal as only one should be present.
	- **Solution:** To handle this, use the `key` property to ensure only the last value is applied:
		```ts
		// pages/index.tsx
		import Head from 'next/head';

		export default function Home() {
		  return (
		    <>
		      <Head>
		        <meta key="description" name="description" content="Description 1" />
		      </Head>
		      <Head>
		        <meta key="description" name="description" content="Description 2" />
		      </Head>
		      <h1>Home Page</h1>
		    </>
		  );
		}
		``` 
	- **Explanation:** The `key` attribute helps to manage duplicates by specifying which meta tag should take precedence. In this case, only "Description 2" will be applied as it is the last one with the same key.

By understanding these principles, you can effectively manage and customize the metadata of your pages in a Next.js application using the pages directory.
