

# Basic Components

## Topics covered in this section of course
1. Setting up Next.js Project
2. Routing Basics
3. Metadata
4. Loading & Errors
5. Dynamic Routes
6. Typescript setup

## Learnings

### 1. Setting up Next.js Project
**Next.js** is a powerful React framework that enables server-side rendering, static site generation, and hybrid rendering, combining the best of server-side and client-side approaches. It simplifies building scalable, SEO-friendly web applications with minimal configuration.
1. **Setting Up a Next.js Application on Local Environment**
	- To create a new Next.js application, use the following command:
	`npx create-next-app@latest my-nextjs-app` 
	- This command will prompt you with options like:
		-   Using TypeScript
		-   Setting up ESLint
		-   Configuring Tailwind CSS
		-   Creating the `src/` directory
		-   Enabling the `app` router (a newer routing system)
	- You can select these options according to your project requirements.
	- After setting up, navigate to your project directory:
`cd my-nextjs-app` 
	- Start the development server:
	`npm run dev` 
	- Your application will now be running at `http://localhost:3000`.

2. **File and Folder Structure Overview**
	- In your Next.js project, the file structure is organized as follows:
		-   **`.next/`**: Generated build files and assets. Typically, you don't need to modify anything here.    
		-   **`public/`**: Stores static assets like images, fonts, and icons, which can be directly accessed via URLs.    
		-   **`src/app/`**:    
		    -   **`layout.tsx`**: A root component that wraps all pages, useful for shared layouts (e.g., headers, footers).
		    -   **`page.tsx`**: The main file for your homepage. Each file in the `app` directory corresponds to a route.
		    -   **`favicon.ico`**: The icon shown in the browser tab.
	-   **`eslintrc.json`**: Configures ESLint for maintaining code quality and consistency.	    
	-   **`nextenv.d.ts`**: TypeScript declaration file for custom environment variables.	    
	-   **`next.config.mjs`**: Custom configuration for your Next.js project.	    
	-   **`tsconfig.json`**: TypeScript configuration file that defines how TypeScript behaves in your project.	    
	-   **`package.json`**: Lists project dependencies, scripts, and other metadata. 
 
3. **Basic Server-Client Relationship in Next.js**: 
	Next.js offers a hybrid approach, allowing both server-side rendering (SSR) and client-side rendering (CSR):
	-   **Server-Side Rendering (SSR)**: When a request is made to the server, Next.js renders the page on the server with all the data required. The rendered HTML is then sent to the client. This improves SEO and ensures the page is ready to view without waiting for JavaScript to load.
	-   **Client-Side Rendering (CSR)**: After the initial HTML is loaded, Next.js can load additional content dynamically on the client side. This is similar to how traditional React applications work, where data is fetched and rendered directly in the browser.

Next.js allows to choose between these methods on a per-page basis, giving us the flexibility to optimize performance and user experience based on the needs of each page.
### 2. Routing Basics
Next.js uses a file-based routing system where the structure of files and folders within the `app` directory directly maps to the routes in the application.

1. **Routing**
	- In the `app` directory, each folder represents a route, and each file (typically `page.tsx`) within that folder corresponds to a specific page at that route. For example:
		-   **`app/page.tsx`**: Renders at `/`.
		-   **`app/about/page.tsx`**: Renders at `/about`.
		-   **`app/blog/[slug]/page.tsx`**: Renders at dynamic routes like `/blog/my-first-post`.
	- Dynamic routes are created using square brackets `[]`. In the example above, `[slug]` can be any value, allowing for flexible URLs.
2. **Layouts** 
	- Layouts in Next.js are used to define consistent UI components that persist across different routes, such as headers, footers, or sidebars. You can define these layouts at different levels of your routing structure.
	- **Root Layout**
		- The **root layout** is defined in `app/layout.tsx` and wraps our entire application. This is where we can include global elements like navigation bars or global metadata.
		- **Example:**
			```ts
			// app/layout.tsx
			export default function RootLayout({ children }: { children: React.ReactNode }) {
			  return (
			    <html lang="en">
			      <body>
			        <header>My Global Header</header>
			        {children}
			      </body>
			    </html>
			  );
			}
			``` 
	- **Sub Layouts**
		- **Sub layouts** allows to create layouts specific to certain sections of your app. For instance, we might have a different layout for the admin section of your site.
		- **Example:**
			```ts
			// app/admin/layout.tsx
			export default function AdminLayout({ children }: { children: React.ReactNode }) {
			  return (
			    <div>
			      <aside>Admin Sidebar</aside>
			      <main>{children}</main>
			    </div>
			  );
			}
			``` 
		- This `AdminLayout` would wrap all pages within the `app/admin` directory.
	- **Nesting of Layouts**
		- We can nest layouts to build complex UI structures. For example, a nested layout might include a sidebar within an overall admin layout:
			```arduino
			app/
			  layout.tsx        // Root layout
			  admin/
			    layout.tsx      // Admin layout
			    dashboard/
			      page.tsx      // Dashboard page
			``` 
		- **In this structure:**
			-   The `dashboard` page would use the `AdminLayout` and the `RootLayout`.
			-   We can layer layouts as deep as necessary for our application's architecture.

3. **Linking Pages in Navigation**
	- Next.js provides a built-in `Link` component to handle client-side navigation, which allows for seamless transitions between pages without full page reloads.
		```ts
		import Link from 'next/link';

		export default function Navbar() {
		  return (
		    <nav>
		      <Link href="/">Home</Link>
		      <Link href="/about">About</Link>
		      <Link href="/blog">Blog</Link>
		    </nav>
		  );
		}
		``` 
	- **Prefetching**
		- By default, Next.js prefetches the code for linked pages in the background when they appear in the viewport. This makes navigation faster because the code for the next page is already loaded by the time the user clicks on the link.
		- We can control prefetching with the `prefetch` prop on the `Link` component:
			`<Link href="/about" prefetch={false}>About</Link>` 
		-   **Prefetch Enabled (default)**: Improves the perceived speed of our app, especially for frequently visited links.
		-   **Prefetch Disabled (`prefetch={false}`)**: Useful when we want to delay loading resources until absolutely necessary, such as for less important or rarely visited pages.

3. **Conclusion:**
	- This routing system allows for building efficient, scalable, and well-structured applications with minimal configuration.

### 3.  **Metadata**
Managing metadata like titles, descriptions, and Open Graph tags is crucial for SEO and social sharing. Next.js provides a structured approach to handling metadata across your application.

1. **Declaring Metadata in Root Layout**
	- We can declare global metadata in the `RootLayout` of  Next.js app. This metadata applies to all pages unless overridden by specific layouts or pages.
	- **Example**
		```ts
		// app/layout.tsx
		import { Metadata } from 'next';

		export const metadata: Metadata = {
		  title: "My Next.js App",
		  description: "Welcome to my Next.js app!",
		  openGraph: {
		    title: "My Next.js App",
		    description: "Welcome to my Next.js app!",
		    url: "https://myapp.com",
		    images: [
		      {
		        url: "https://myapp.com/og-image.jpg",
		        width: 800,
		        height: 600,
		      },
		    ],
		  },
		};

		export default function RootLayout({ children }: { children: React.ReactNode }) {
		  return (
		    <html lang="en">
		      <body>{children}</body>
		    </html>
		  );
		}
		``` 
	- This metadata is applied globally, meaning all pages will inherit these settings unless explicitly overridden.

2.  **Overriding Metadata in Sub Layouts**
	- Sub layouts can override metadata declared in the root layout. When we declare metadata in a sub layout, it takes precedence over the root layout for that section of the app.
	- **Example**:
		```ts
		// app/blog/layout.tsx
		import { Metadata } from 'next';

		export const metadata: Metadata = {
		  title: "Blog - My Next.js App",
		  description: "Read our latest blog posts!",
		};

		export default function BlogLayout({ children }: { children: React.ReactNode }) {
		  return (
		    <div>
		      <header>Blog Header</header>
		      <main>{children}</main>
		    </div>
		  );
		}
		``` 
	- This metadata will apply to all pages under the `/blog` route, overriding the root layout's metadata for those pages.

3.  **Nesting of Metadata**
	- We can nest metadata by declaring it in either a page or a layout file. Metadata in a layout affects all nested routes, while metadata in a page file is specific to that page.
	- For example, if you have metadata declared in both a sub layout and a specific page, the page's metadata will override the sub layout's metadata.

4. **Shallow Merging**
	- Metadata in Next.js is shallowly merged. This means that when we override a metadata key, the entire key is replaced, not just specific properties within an object.
	- For instance, if we define Open Graph metadata in both the root layout and a sub layout, the sub layout will replace the entire `openGraph` object, not just individual properties:
		```ts
		// Root layout
		export const metadata: Metadata = {
		  openGraph: {
		    title: "Root Title",
		    description: "Root Description",
		  },
		};

		// Sub layout
		export const metadata: Metadata = {
		  openGraph: {
		    title: "Sub Layout Title", // This replaces the entire `openGraph` object
		  },
		};
		``` 
	- Here, the `description` from the root layout is lost because the `openGraph` object is replaced.

5.  **Two Ways to Declare Metadata**
	1.  **Exporting a `const metadata` Variable**:   
	    -   This is the most common approach for static metadata.
	    -   Ideal for when metadata is known ahead of time and doesn’t depend on dynamic data.   
		-  **Example:**
		    ```ts
		    export const metadata: Metadata = {
		      title: "Static Page",
		      description: "This is a static page with predefined metadata.",
		    };
		    ``` 
    
	2. **Using a `function metadata`**:    
	    -   Use this approach when metadata needs to be dynamically generated based on parameters or other data.
	    -   Ideal for pages with dynamic content, such as blog posts or product pages.
	    - **Example**
		    ```ts
		    export async function generateMetadata({ params }): Promise<Metadata> {
		      const post = await getPostData(params.slug);
		      return {
		        title: post.title,
		        description: post.excerpt,
		      };
		    }
		    ``` 
6. **Conclusion**:
	- This structured approach of defining metadata enables us to maintain consistent, SEO-friendly metadata across the application, with the flexibility to customize it where needed.

### 4. Loading & Errors
In Next.js, managing loading states and handling errors effectively is crucial for providing a smooth user experience. Below is a guide on how Next.js facilitates these through built-in features.

1. **Server Components by Default**
	- In Next.js, all components are **server components** by default. This means they are rendered on the server, which can improve performance and SEO. To fetch data within a component, we can simply add the `async` keyword to the component function, allowing us to use `await` inside it.
	- Example:
		```ts
		// app/page.tsx
		export default async function HomePage() {
		  const data = await fetch('https://api.example.com/data').then(res => res.json());
		  return <div>{data.content}</div>;
		}
		``` 
2. **Full-Page Loading Fallback with `loading.tsx`**
	- To show a loading state for an entire page, Next.js allows us to create a `loading.tsx` file within the same directory as our `page.tsx` or `layout.tsx` files. This component will automatically be displayed while the page's data is being fetched.
	- **Example:**
		```ts
		// app/loading.tsx
		export default function Loading() {
		  return <div>Loading...</div>;
		}
		``` 
	- This file will handle the loading state globally for that route, including any nested routes or components.
3. **Partial-Page Loading with `Suspense`**
	- For more granular control over loading states, especially when we only want to show a loading indicator for part of the page, you we use the `Suspense` component from React. This is particularly useful when different parts of the page are loading different data.
	- Example:
		```ts
		import { Suspense } from 'react';

		export default function DashboardPage() {
		  return (
		    <div>
		      <Suspense fallback={<div>Loading chart...</div>}>
		        <ChartComponent />
		      </Suspense>
		      <Suspense fallback={<div>Loading stats...</div>}>
		        <StatsComponent />
		      </Suspense>
		    </div>
		  );
		}
		``` 
	- Here, the `Suspense` component will only display the fallback loading UI for the specific parts of the page where data is still being fetched. Ensure that any data-fetching logic inside `Suspense` is enclosed within components that are themselves marked as `async`.
4. **Error Handling with `error.tsx`**
	- To handle errors that might occur during data fetching or rendering, we can create an `error.tsx` file within the same directory. Unlike other components, this should be a **client component** (using `use client`) because error handling often involves interactions, like retry buttons, which need to be rendered on the client.
	- **Example:**
		```ts
		// app/error.tsx
		'use client';

		import { useEffect } from 'react';

		export default function Error({ error, reset }: { error: Error; reset: () => void }) {
		  useEffect(() => {
		    console.error(error);
		  }, [error]);

		  return (
		    <div>
		      <h2>Something went wrong!</h2>
		      <button onClick={reset}>Try again</button>
		    </div>
		  );
		}
		``` 
	- This `error.tsx` file will catch any errors that occur during the rendering of the page or its components and provide a user-friendly message along with a way to retry the action.

4. **Nested Loading and Error States**
	In Next.js, loading and error handling works in a nested manner, similar to routing. For example, if we have nested routes or components, the loading states and error boundaries will also nest accordingly. This means that if a parent route or component is loading, the child components will wait until the parent has finished before showing their own loading or error states.

6. **Conclusion**
By organizing our `loading.tsx`, `error.tsx`, and `Suspense` components effectively, we can ensure a smooth user experience even when your app is fetching data or encountering errors.
### 5. Dynamic Routes
Dynamic routing in Next.js allows us to create pages that can handle dynamic parameters in the URL, making your application more flexible and scalable.

1. **Dynamic Parameters in Routes**
	- Next.js enables dynamic routing by using square brackets in the file or folder name. For example, a route like `app/blog/[slug]/page.tsx` can handle URLs like `/blog/my-first-post`. We can access the dynamic parameter (`slug` in this case) directly in our component's function parameters, which is especially useful for fetching data or handling logic based on the route.
	- Example:
		```ts
		// app/blog/[slug]/page.tsx
		import { notFound } from 'next/navigation';

		export default async function BlogPost({ params }: { params: { slug: string } }) {
		  const data = await fetchData(params.slug);

		  if (!data) {
		    notFound();
		  }

		  return <div>{data.title}</div>;
		}
		``` 
	- In this example, the `params` object is passed directly into the `BlogPost` function, making it easy to use the `slug` parameter to fetch data. If the `fetchData` function returns `null` or `undefined`, the built-in `notFound` function will trigger the 404 page.
	- One thing to note is that in TypeScript, we need to manually define our parameters. This is a bit tedious but ensures type safety throughout your application.
2.  **Getting Parameters with `useParams` Hook**
	- To access dynamic parameters within a child component (called from the `page.tsx`), we can use the `useParams` hook provided by Next.js. This hook allows us to retrieve parameters easily within any part of your component tree.
	- Example:
		```ts
		// app/blog/[slug]/page.tsx
		import BlogContent from './BlogContent';

		export default function BlogPost() {
		  return <BlogContent />;
		}

		// app/blog/[slug]/BlogContent.tsx
		import { useParams } from 'next/navigation';

		export default function BlogContent() {
		  const { slug } = useParams();
		  return <div>Content for {slug}</div>;
		}
		``` 

3. **Dynamic URL with Multiple Parameters**
	- In scenarios where we need to handle multiple parameters in a URL (e.g., `example/1/2/3`), you can achieve this by using nested dynamic routes and destructuring the parameters in our component.
	- Example:
		```ts
		// app/example/[...params]/page.tsx
		import { useParams } from 'next/navigation';

		export default function ExamplePage() {
		  const { params } = useParams();
		  const [param1, param2, param3] = params || [];

		  return (
		    <div>
		      <p>Param 1: {param1}</p>
		      <p>Param 2: {param2}</p>
		      <p>Param 3: {param3}</p>
		    </div>
		  );
		}
		``` 

	- In this example, the `params` array will contain all the segments of the URL, allowing us to handle them as needed.

4. **Optional URL Parameters**
	- We can make a URL parameter optional by enclosing the folder name in an extra set of square brackets. For instance, `[[id]]` would make the `id` parameter optional, allowing the route to match both `/example` and `/example/123`.
	- **Example:**
		```ts
		// app/example/[[id]]/page.tsx
		export default function ExamplePage({ params }: { params: { id?: string } }) {
		  const { id } = params;
		  return <div>{id ? `ID: ${id}` : "No ID provided"}</div>;
		}
		``` 
	- This flexibility makes dynamic routing in Next.js powerful and versatile, allowing us to handle complex routing scenarios with ease.
5.  **Custom Page Not Found**
	- When a user navigates to a route that doesn't exist, we can show a custom "Page Not Found" (404) page. This is achieved by creating a `not-found.tsx` file within the relevant directory. If this file is not present, Next.js will fall back to the root layout's error page, which might not provide the most user-friendly experience. A custom 404 page is useful as it helps display the error exactly where it should be, ensuring that the rest of the application remains functional.
	- **Example:**
		```ts
		// app/not-found.tsx
		export default function NotFound() {
		  return <div>Oops! Page not found.</div>;
		}
		``` 
6.  **Separate `not-found.tsx` for Specific Pages**
	- We can create a `not-found.tsx` file within a specific directory to handle 404 errors for that particular route. 
	- The content of the `layout.tsx` file will be rendered first, followed by the custom not-found page's content. 
	- If this file is absent, Next.js will display the root layout's error page, bypassing the specific layout entirely.
	- Having individual not-found pages is particularly helpful when we have a complex UI, as it ensures that the error message only appears in the intended section, while the rest of the UI continues to function normally.
### Typescript Setup
Next.js includes a custom TypeScript plugin and type checker, which VSCode and other code editors can use for advanced type-checking and auto-completion.

1.  **Steps to Set Up TypeScript in a Next.js Project**
	- **Create a New Next.js Project with TypeScript**: When we create a new Next.js project, we can initialize it with TypeScript by selecting the TypeScript option during the setup.    
	    `npx create-next-app@latest my-project --typescript` 	    
	 - This command will generate a new Next.js project with TypeScript configuration files like `tsconfig.json` and `next-env.d.ts`.    
2.  **Install the TypeScript Plugin**: The TypeScript plugin comes pre-bundled with Next.js, so there's no need to install it separately. It is automatically configured when you use TypeScript in your Next.js project. The plugin enhances the development experience by providing better type-checking and auto-completion tailored to Next.js.    
3.  **Enable the TypeScript Plugin in VS Code**: To make the most of the TypeScript plugin, you'll need to enable it in VS Code. Here’s how you can do that:
    - **Open VS Code**: Make sure you're using VS Code as your editor.        
    - Make sure that root folder of next.js is setup as the workspace folder.        
    - Open VS code command pallet (`Ctrl/⌘` + `Shift` + `P`)
    - Search for "TypeScript: Select TypeScript Version"
    - Select "User Workspace version"
    - Now, when editing files, the custom plugin will be enabled and whill show the specific next.js related TS errors.
    - For example it will throw error for useState can't be called in the server component in next.js
4. **Summary**
By using the TypeScript plugin pre-bundled with Next.js we can significantly improve your development experience in VS Code. The plugin helps by providing enhanced IntelliSense and type-checking that are specifically optimized for Next.js applications.
        
