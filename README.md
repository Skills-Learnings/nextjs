# Pages Directory and Shared Features
## Topics covered in this section of course
1. Pages Directory
	- Special Files
	- Rendering Modes
	- getServerSideProps
	- getStaticProps & getStaticPaths
	- getInitialProps
	- Data Mutation
2. Shared Features
	- Fonts
	- Images
	- Scripts
 
## Learnings
### 1.1 Special Files
In a Pages-based Next.js app, there are special files with reserved names that serve specific roles in managing how the app operates. These files include `_app.tsx`, `_document.tsx`, and several others for handling errors like `404.tsx`, `500.tsx`, and `_error.tsx`.

1. **_document.tsx**: 
	- This file is responsible for setting up the structure of the entire HTML document. It only runs on the server and is useful for tasks like adding classes to the `body` tag or configuring global settings that need to be applied across all pages. 
	- However, because this file never runs on the client, you can't include any client-specific code like event listeners here. Typically, you won't modify this file often.
2. **_app.tsx**: 
	- The `_app.tsx` file acts as a wrapper for all pages in your application. It allows you to apply a global layout, add context providers, or manage global state that every page can access. 
	- For instance, you could wrap every page with a layout component or add a persistent header across all pages. You can also pass props to every page through this file, but it's generally better to use context for shared state to avoid unnecessary prop drilling.
3. **404.tsx and 500.tsx**: 
	- These files are for custom error pages. `
	- 404.tsx` is used for creating a custom "Page Not Found" error page, and `500.tsx` is for handling server errors. 
	- While the 404 error page is immediately visible during development, the 500 error page only appears in production, making it essential to build your application to test this behavior.
4. **_error.tsx**: 
	- This file provides a more detailed error page that can display specific information about errors.
	-  While `500.tsx` is static and only shows a generic error message, `_error.tsx` can be used to handle dynamic error messages by rendering error details based on what happened on the server. 
	- It's more complex to set up but gives you finer control over how errors are displayed.
    
These special files play crucial roles in controlling the overall structure, global state, and error handling within a Pages-based Next.js application. While they are not frequently modified, understanding their purpose allows you to create more robust and well-structured applications.

### 1.2 Rendering Modes
In the pages directory of a Next.js application, rendering modes are crucial to understand because they determine how your application's pages are built and delivered to users. Unlike the app directory, where each component is either server-rendered or client-rendered, the pages directory allows the entire page to follow one of four distinct rendering methodologies: Client-Side Rendering (CSR), Server-Side Rendering (SSR), Static Site Generation (SSG), and Incremental Static Regeneration (ISR).

1.  **Client-Side Rendering (CSR)**: 
	- CSR is when the rendering of your application happens entirely on the client side. The server sends a blank HTML file along with JavaScript to the client, which then executes the JavaScript to render the page. 
	- This method is common in traditional React applications. While it reduces the load on the server, it increases the client’s workload because everything, including data fetching, happens on the client side. 
	- CSR is generally less favored in Next.js because Next.js encourages server-side processing.
2.  **Server-Side Rendering (SSR)**: 
	- SSR involves rendering the page on the server for every request. When a user makes a request, the server generates the HTML dynamically, which is then sent to the client. 
	- The main advantage of SSR is that it provides fully-rendered HTML on the first load, improving SEO and reducing the time to interactive. 
	- However, this method can be slower for the server, as it needs to process each request individually.
3.  **Static Site Generation (SSG)**: 
	- SSG allows pages to be pre-rendered at build time. The HTML is generated during the build process, meaning that when users request the page, the server sends a fully rendered page without needing to regenerate it. 
	- This results in faster load times for users because the server has minimal work to do. 
	- However, SSG is best suited for pages that don't change frequently, like an "About" page or a blog post, because once the site is deployed, the data is fixed until the next build.
4. **Incremental Static Regeneration (ISR)**: 
	- ISR is a hybrid approach that combines the benefits of SSG and SSR. 
	- Like SSG, pages are generated at build time, but ISR allows these static pages to be updated after they’ve been deployed without requiring a full rebuild. 
	- When a request is made after a set period, the page can be regenerated in the background, ensuring that the data remains up-to-date. 
	- ISR is ideal for content that is mostly static but occasionally changes, like product pages on an e-commerce site.
5. **Summary**:
	- Each of these rendering methods has its own build time, server time, and client time implications. 
	- SSR focuses more on server time, CSR emphasizes client-side processing, while SSG and ISR prioritize build time, with ISR offering a dynamic update capability post-deployment. 
	- Understanding these differences will help you choose the right rendering strategy based on your application's needs.
### 1.3 getServerSideProps
In the pages directory of a Next.js app, `getServerSideProps` is a function used to enable server-side rendering (SSR) on specific pages. This function is called on every request to the page, allowing you to fetch data and pass it as props to your component, ensuring that the content is always up-to-date and dynamically generated based on the request.
Here's a breakdown of the key concepts and steps associated with `getServerSideProps`:
1.  **Function Purpose**: 
	- `getServerSideProps` is Next.js's way of rendering pages on the server on every request. 
	- Unlike client-side rendering (CSR), where you might use `useEffect` to fetch data in a React component, SSR with `getServerSideProps` runs this fetching logic on the server, reducing the need for loading states and improving performance.
2.  **Usage Example**: 
	- We have a page that needs to display a list of Todos. 
	- Instead of fetching this data on the client side, we would use `getServerSideProps` to fetch the data on the server. 
	- The function returns an object containing props that are passed to the component rendering the page.  
	    ```ts
	    export async function getServerSideProps() {
	      const res = await fetch('https://jsonplaceholder.typicode.com/todos');
	      const data = await res.json();
	      return {
	        props: {
	          todos: data,
	        },
	      };
	    }
	    ``` 
    
	- In this example, the Todos data is fetched from an API and passed as a prop to the page component, where it can be rendered without additional client-side fetching.
3.  **Server-Only Execution**: 
	- Any code inside `getServerSideProps` runs only on the server. 
	- For instance, if you log something within this function, it will appear in the server logs, not in the browser console. 
	- This makes it ideal for server-specific tasks like accessing secure environment variables.    
4. **Dynamic Pages**: 
	- By using `getServerSideProps`, you opt out of static generation for that page. 
	- This means the page cannot be cached or pre-rendered; it must be dynamically rendered for each request.
	- Next.js's pages are statically rendered by default unless you use `getServerSideProps` or `getInitialProps`, making the page dynamic.
5. **Advanced Example with Dynamic Parameters**: 
	- For more complex pages, such as an individual Todo page, `getServerSideProps` can take a `context` parameter that provides access to route parameters, query strings, and even the request object.    
	    ```ts
	    export async function getServerSideProps(context) {
	      const { params } = context;
	      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${params.todoId}`);
	      const data = await res.json();
	      if (!data.id) {
	        return {
	          notFound: true,
	        };
	      }
	      return {
	        props: {
	          todo: data,
	        },
	      };
	    }
	    ```     
   - In this example, `params.todoId` is used to fetch data for a specific Todo based on the dynamic route. If the Todo doesn't exist, the page redirects to a 404 page using `notFound: true`.    
6. **Typing with TypeScript**: To ensure type safety, Next.js provides a built-in type called `InferGetServerSidePropsType`. You can use it to infer the prop types from your `getServerSideProps` function, ensuring your component receives correctly typed props.    
    ```ts
    import { InferGetServerSidePropsType } from 'next';
    
    export const getServerSideProps = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await res.json();
      return {
        props: {
          todos: data,
        },
      };
    };
    
    export default function TodoDetail({todo,todoId }: InferGetServerSidePropsType<typeofgetServerSideProps>) 
    ```     
	  -   This type inference helps prevent errors by aligning the types in your component with the data returned from the server.    
7.  **Other Returns**: 
	- Besides returning props, `getServerSideProps` can also trigger a redirect or return a 404 page. 
	- For instance, you might redirect a user to the homepage if they try to access an invalid Todo ID, or you might show a custom 404 page.  
	    ```ts
	    if (!data.id) {
	      return {
	        notFound: true,
	      };
	    }
	    
	    return {
	      redirect: {
	        destination: '/',
	        permanent: false,
	      },
	    };
	    ``` 
	- Here, the redirect or `notFound` behavior is conditionally returned based on the data fetched.
8.  **Considerations**: Since `getServerSideProps` runs on every request, it can impact performance if the data fetching process is slow. It's crucial to optimize the data fetching or consider alternative methods like static generation or client-side fetching when appropriate.

By using `getServerSideProps`, you can control how your pages are rendered, ensuring they are dynamic and responsive to user interactions, while leveraging the power of server-side rendering in Next.js.
### 1.4 getStaticProps & getStaticPaths
In a Next.js application that uses the `pages` directory, the `getStaticProps` and `getStaticPaths` functions are key components for implementing static site generation (SSG). These functions are used to pre-render pages at build time, making them faster and more efficient by serving static HTML instead of generating content on the server for every request.
1.  **Default Static Generation**: 
	- By default, any page in the `pages` directory without `getInitialProps` or `getServerSideProps` will be statically generated when the app is built. 
	- For example, if you have a simple `index` page without any data fetching, it will be statically generated.
    
2.  **Using `getStaticProps`**: 
	- If you have a page that fetches data but the data doesn't change frequently (like a list of todos that stays the same), you can use `getStaticProps`. 
	- This function runs at build time and generates the HTML file that can be served to the user.    
	    ```ts
	    export async function getStaticProps() {
	      const todos = await fetchTodos(); // Fetch data during build
	      return {
	        props: { todos }, // Pass data to the page via props
	      };
	    }
	    ``` 
    
   - In development, `getStaticProps` runs on each request, but in production, it runs only at build time, ensuring the page loads quickly without server-side processing.
3. Handling Dynamic Routes with `getStaticPaths`
	- For pages with dynamic routes, like `/todos/[id]`, you can use `getStaticPaths` in conjunction with `getStaticProps` to statically generate multiple pages based on dynamic parameters.
	- **Defining Dynamic Paths**: `getStaticPaths` is used to specify which dynamic routes should be pre-rendered at build time. It returns an array of paths with the dynamic parameters.
	    ```ts
	    export async function getStaticPaths() {
	      const paths = [{ params: { id: '1' } }, { params: { id: '2' } }];
	      return {
	        paths,
	        fallback: false, // or 'blocking' or 'true'
	      };
	    }
	    ``` 
	- **Using `getStaticProps` with Dynamic Routes**: You still use `getStaticProps` to fetch the data for each dynamic route.
	    ```ts
	    export async function getStaticProps({ params }) {
	      const todo = await fetchTodoById(params.id);
	      return {
	        props: { todo },
	      };
	    }
	    ``` 
	- **Fallback Options**: The `fallback` key in `getStaticPaths` controls what happens if a requested path is not pre-generated:    
	    -   `false`: Returns a 404 page if the route isn’t generated at build time.
	    -   `blocking`: Generates the page on-demand when it’s first requested.
	    -   `true`: Shows a fallback page while generating the final page on the server.
4. **Revalidation and Incremental Static Regeneration (ISR)**
	- You can also use the `revalidate` option in `getStaticProps` to enable Incremental Static Regeneration. This allows you to rebuild the page at intervals, ensuring content stays fresh.
		```ts
		export async function getStaticProps() {
		  const todos = await fetchTodos();
		  return {
		    props: { todos },
		    revalidate: 10, // Revalidate every 10 seconds
		  };
		}
		``` 

	- With ISR, after the initial static generation, pages can be revalidated in the background at the specified interval, ensuring that users get up-to-date content without requiring full server-side rendering.
5. Summary
	-   **`getStaticProps`** runs at build time, making pages fast and efficient by pre-rendering them as static HTML.
	-   **`getStaticPaths`** works with `getStaticProps` to pre-render dynamic routes, specifying which paths should be generated.
	-   **Fallback** handling in `getStaticPaths` provides flexibility in how ungenerated routes are managed.
	-   **Revalidation** allows for updating static pages at intervals, combining the benefits of static generation with fresh content updates.

This approach ensures that your Next.js app can handle both static and dynamic content efficiently, providing a seamless experience for users.
### 1.5 getInitialProps
The `getInitialProps` function in Next.js is an older method for fetching data during server-side rendering. While it's still available, it is now considered outdated and should be used only in specific scenarios, as it has largely been replaced by `getStaticProps` and `getServerSideProps`.
1. **When to Use `getInitialProps`**
	-   **Special Use Cases**: The primary places where you might still use `getInitialProps` are in the custom `_app.tsx` (which wraps all pages) and `_error.tsx` (which handles custom error pages). These are scenarios where `getStaticProps` and `getServerSideProps` are not applicable.
    -   **Considerations in `_app.tsx`**: If you define `getInitialProps` in the `_app.tsx` file, it disables Next.js's default static optimization, meaning that none of your pages will be statically generated. This is a significant downside, as static generation can greatly enhance performance and reduce server load.
2. How `getInitialProps` Works
	-   **Function Definition**: You define `getInitialProps` as an asynchronous function, either using a traditional function or an arrow function. The function receives an object containing various properties like `query`, `req`, `res`, etc., although you might not always need to use them.
    -   **Data Fetching**: Inside `getInitialProps`, you perform your data fetching, similar to how you would in `getServerSideProps` or `getStaticProps`. After fetching the data, you return an object that represents the props for your component.
    -   **TypeScript Considerations**: Unlike `getStaticProps` and `getServerSideProps`, `getInitialProps` does not offer strong TypeScript inference out of the box. You might need to cast types manually, which can be less convenient and potentially error-prone.
3. **Example of `getInitialProps`**
	- Here's a basic example of how you might implement `getInitialProps`:
	- **Replacing `getStaticProps` with `getInitialProps`**: If you had previously used `getStaticProps`, you can replace it with `getInitialProps` by defining the latter on the page component directly.
    - **Fetching Data**: Inside `getInitialProps`, you fetch your data and return it as part of the props.
	    ```ts
	    MyPage.getInitialProps = async () => {
	      const data = await fetch('https://jsonplaceholder.typicode.com/todos');
	      const todos = await data.json();
	      return { todos };
	    };
	    ``` 
    
	- **Running on Every Request**: Unlike `getStaticProps`, which runs at build time, or `getServerSideProps`, which runs on each request but still optimizes certain scenarios, `getInitialProps` runs on every single request. This can be observed by adding a `console.log` statement within `getInitialProps` and noticing that it logs to the console on every page refresh, even in production.    
4. **Downsides of Using `getInitialProps`**
	-   **No Static Generation**: Using `getInitialProps` disables static generation, which can negatively impact performance and scalability.
	-   **Limited TypeScript Support**: `getInitialProps` does not offer the same level of type safety as `getStaticProps` and `getServerSideProps`.
	-   **Less Detailed Information**: The information passed to `getInitialProps` is less detailed compared to the newer data-fetching methods.
5. **Conclusion**
	- While `getInitialProps` is still a part of Next.js, it is generally recommended to avoid it in favor of `getStaticProps` and `getServerSideProps`, except in specific cases like the custom `_app.tsx` or `_error.tsx` components. The newer methods offer better performance, type safety, and more detailed information.
### 1.6 Data Mutation
In a pages-directory-based Next.js app, data mutation, such as submitting a form to create a new todo, relies on creating API routes. Unlike the app directory, where server actions are used, the pages directory requires the use of traditional API routes.
1.  **Creating an API Route**:
    -   You need to create a folder named `api` inside the `pages` directory. This is where all API routes will reside.
    -   Create a file, e.g., `todos.ts`, which corresponds to the `/api/todos` endpoint.
2.  **Handler Function**:
    -   Export a default function called `handler`, which will take two parameters: `request` (of type `NextApiRequest`) and `response` (of type `NextApiResponse`).
    -   This function handles different HTTP methods (e.g., GET, POST) and responds accordingly.
3.  **Submitting Form Data**:
    -   On the frontend, use a form with an `onSubmit` handler that triggers a `fetch` request to the `/api/todos` endpoint with the method set to POST.
    -   Send the form data, such as the todo title, in the request body as JSON.
4.  **Handling the Request in the API**:
    -   Check the HTTP method using `request.method` to ensure it's a POST request.
    -   Extract the form data from `request.body` and create a new todo in the database.
    -   Return a JSON response with the newly created todo.
5.  **Handling Routing**:
    -   After creating the todo, you can use `router.push` to redirect the user to the new todo's page.
    -   For dynamic routes, ensure you handle them by accessing `request.query` to retrieve dynamic parameters like `todoId`.
6.  **Revalidating Pages**:
    -   Since pages are statically generated, they need to be revalidated to reflect new data. Use the `revalidate` function in the API route to trigger on-demand revalidation for specific paths like `/todos`.
7.  **Fallbacks for Static Pages**:
    -   Use `getStaticProps` with a fallback of `blocking` to ensure that new pages are rendered if they don't already exist.

This approach is essential for handling data mutations in a Next.js app that uses the pages directory.

### 2.1 Fonts
In Next.js, importing fonts is incredibly easy, and you can do it in two main ways: by importing Google Fonts or by importing local fonts.
1. **Importing Google Fonts**
	-   **Step 1**: Start by importing the desired Google Font from `next/font/google`. For instance, if you want to use the "Inter" font:    
	    ```ts
	    import { Inter } from 'next/font/google';
	    
	    const inter = Inter({ subsets: ['latin'] });
	    ```     
	-   **Step 2**: 
		- The `Inter` function returns an object with `className` and `style` properties, which you can use in your components:    
	    ```ts
	    export default function Home() {
	      return (
	        <div className={inter.className}>
	          <h1>Hello, World!</h1>
	        </div>
	      );
	    }
	    ```
2. **Variable Fonts**: If the font is variable, you only need to specify the subset, like `latin`. For non-variable fonts like "Roboto," you must also specify the weights and styles.    
    ```ts		
    import { Roboto } from 'next/font/google';
    
    const roboto = Roboto({ 
      subsets: ['latin'], 
      weight: ['400', '700'], 
      style: ['normal', 'italic'] 
    });
    ```     
3. **Using CSS Variables for Fonts**
	-   **Step 1**: You can set a font as a CSS variable for more flexibility:    
    ```ts
    const inter = Inter({ 
      subsets: ['latin'], 
      variable: '--my-font' 
    });
    
   export default function Home() {
     return (
       <div style={{ fontFamily: 'var(--my-font)' }}>
         <h1>Hello, World!</h1>
       </div>
     );
   }
   ```     
	-   This approach allows you to reuse the font in different parts of your application using the `var(--my-font)` CSS variable.
4. **Importing Local Fonts**
	-   **Step 1**: If you have a local font file, you can import it using `next/font/local`.    
	    ```ts
	    import localFont from 'next/font/local';
	    
	    const roboto = localFont({
	      src: [
	        { path: './fonts/Roboto-Medium.ttf', weight: '500', style: 'normal' },
	        { path: './fonts/Roboto-MediumItalic.ttf', weight: '500', style: 'italic' },
	        { path: './fonts/Roboto-Bold.ttf', weight: '700', style: 'normal' },
	        { path: './fonts/Roboto-BoldItalic.ttf', weight: '700', style: 'italic' },
	      ],
	    });
	    ```     
	-   **Step 2**: Use the imported font in your component:    
	    ```ts
	    export default function Home() {
	      return (
	        <div className={roboto.className}>
	          <h1>Hello, World!</h1>
	        </div>
	      );
	    }
	    ```     
	-   **Optimization**: Next.js optimizes font loading by ensuring that only the fonts used on a specific page are loaded, improving performance.
5. **Best Practices**
	-   **One-Time Initialization**: Import and initialize fonts only once in your application, preferably in a separate `font.ts` file, to avoid redundant font loading.
	-   **Usage in Layouts**: Define your fonts in the root layout or specific layout files to ensure consistent font usage across different pages.

By following these steps, you can easily integrate and manage fonts in your Next.js application, whether they're from Google Fonts or your local assets.

### 2.2 Image
In Next.js, images can have a significant impact on performance, but the built-in `Image` component helps optimize image handling automatically. Here's how it works:

1. **Replacing `<img>` with `next/image`**
	- Instead of using a standard `<img>` tag, replace it with the `Image` component from `next/image`. This component optimizes images by resizing them, lazy-loading, and converting them to more efficient formats like `WebP`.
		```ts
		import Image from 'next/image';
		import myImage from '/public/image.jpg';

		function MyComponent() {
		  return (
		    <div>
		      <Image src={myImage} alt="A beautiful scenery" width={500} height={500} />
		    </div>
		  );
		}

		export default MyComponent;
		``` 
	- In this example, Next.js will ensure that the image is optimized, loading a version smaller than the original (e.g., 500x500 pixels), instead of the full-size image, which improves performance.
2. **Automatic Format Optimization**
	- Next.js automatically converts images to smaller, more efficient formats like WebP when supported by the browser, even if the source image is in a different format such as JPG.
3. **Dynamic Sizing with `fill`**
	- If the image should fill a container, you can use the `fill` property, allowing the image to resize based on the container dimensions. Ensure the container has a `position: relative` style.
		```ts
		function MyComponent() {
		  return (
		    <div style={{ width: '500px', height: '500px', position: 'relative' }}>
		      <Image src={myImage} alt="A beautiful scenery" fill />
		    </div>
		  );
		}
		``` 
4. **Blurred Placeholder**
	- The `Image` component can show a blurred version of the image while it's loading. This is automatically generated for locally stored images.
`<Image src={myImage} alt="A beautiful scenery" width={500} height={500} placeholder="blur" />` 
5. **Handling External Images**
	- If you're loading an image from an external source, you must configure it in `next.config.js` by adding the domain under `remotePatterns`.
		```ts
		// next.config.js
		module.exports = {
		  images: {
		    remotePatterns: [
		      {
		        protocol: 'https',
		        hostname: 'images.unsplash.com',
		      },
		    ],
		  },
		};
		``` 
	- In your component, you will have to specify the width and height manually since external images don’t have this data available.
		```ts
		<Image
		  src="https://images.unsplash.com/photo-123456789"
		  alt="Unsplash Image"
		  width={500}
		  height={500}
		/>
		``` 
6. **Priority Image Loading**
	- For images crucial to your page’s layout (like those that contribute to the Largest Contentful Paint, or LCP), use the `priority` attribute to load them faster.
`<Image src={myImage} alt="Important Image" width={500} height={500} priority />` 

By using the Next.js `Image` component, you enhance performance by loading the correct image size, lazy-loading images, serving modern formats, and handling LCP properly.

### 2.3 Scripts
In Next.js, handling third-party scripts that you can't directly import from npm or include in your project as a module is straightforward, thanks to the built-in `Script` component from `next/script`. This feature is particularly useful for loading scripts like analytics trackers, cookie consent banners, or any other external scripts that you need to include in your application. Below is an overview of how to use the `Script` component, with examples illustrating various use cases.
1. **Loading Third-Party Scripts**
	- To load a third-party script, such as jQuery from a CDN, you use the `Script` component. This component allows you to specify the script's source URL, which will be loaded into your application.
		```ts
		import Script from 'next/script';

		export default function Home() {
		  return (
		    <div>
		      <h1>Hello, world!</h1>
		      <Script 
		        src="https://code.jquery.com/jquery-3.6.0.min.js"
		        strategy="afterInteractive"
		        onLoad={() => console.log("jQuery loaded")}
		      />
		    </div>
		  );
		}
		``` 
	- In this example:
		-   `src` specifies the URL of the script.
		-   `strategy="afterInteractive"` indicates that the script should load after the page becomes interactive.
		-   `onLoad` runs a function when the script has loaded successfully.
2. **Using the Loaded Script**
	- Once the script is loaded, you can use it within your components. For example, you could use jQuery to change an element's text when clicked.
		```ts
		import Script from 'next/script';
		import { useEffect } from 'react';

		export default function Home() {
		  useEffect(() => {
		    if (typeof window !== 'undefined' && window.jQuery) {
		      $('#change-text').click(() => {
		        $('h1').text('Goodbye!');
		      });
		    }
		  }, []);

		  return (
		    <div>
		      <h1>Hello, world!</h1>
		      <button id="change-text">Change Text</button>
		      <Script 
		        src="https://code.jquery.com/jquery-3.6.0.min.js"
		        strategy="afterInteractive"
		        onLoad={() => console.log("jQuery loaded")}
		      />
		    </div>
		  );
		}
		``` 
	- In this example, jQuery is used to change the text of the `<h1>` element when the button is clicked. The `useEffect` hook ensures that the jQuery code only runs after the script is loaded and the component is mounted.
3. **Script Loading Strategies**
	- The `Script` component allows you to control when the script should load using the `strategy` prop. Here are the available strategies:
	-   **`afterInteractive`** (default): The script loads after the page becomes interactive.    
	-   **`beforeInteractive`**: The script loads before the page becomes interactive, typically used for critical scripts like cookie consent banners. This should be placed in your root layout.    
	    ```ts
	    <Script 
	      src="https://example.com/critical-script.js"
	      strategy="beforeInteractive"
	    />
	    ``` 
    - **`lazyOnload`**: The script loads during idle time after all other resources have finished loading, suitable for non-critical scripts like chatbots.    
	    ```ts
	    <Script 
	      src="https://example.com/chatbot.js"
	      strategy="lazyOnload"
	    />
	    ``` 
4. **Handling Script Events**
	- You can manage various events related to the script, such as when it loads or encounters an error:
		```
		<Script 
		  src="https://example.com/some-script.js"
		  onLoad={() => console.log('Script loaded successfully')}
		  onReady={() => console.log('Script ready')}
		  onError={() => console.log('Error loading script')}
		/>
		``` 
		-   **`onLoad`**: Executes when the script is fully loaded.
		-   **`onReady`**: Executes when the script is loaded and the component mounts, and every time the component remounts.
		-   **`onError`**: Executes if there is an error loading the script.
5. **Passing Custom Attributes to Script**
	- Sometimes, third-party scripts require custom attributes. You can pass these directly to the `Script` component, and they will be included in the script tag:
		```ts
		<Script 
		  src="https://example.com/custom-script.js"
		  data-id="uniqueId"
		/>
		``` 
6. **Inline Scripts**
	- You can also write inline scripts using the `Script` component, although this is less common. Here's an example:
		```ts
		<Script id="inline-script">
		  {`
		    console.log('Inline script running');
		  `}
		</Script>
		``` 
	- In this example:
		-   The `id` attribute is required for inline scripts.
		-   The script content must be enclosed in curly braces and passed as a string.

7. **Summary**
	- The `Script` component in Next.js provides a powerful and flexible way to include third-party scripts in your application. 
	- Whether you need to load scripts after the page is interactive, before it loads, or during idle time, the `Script` component has you covered with various strategies. 
	- You can also manage events like script loading or errors and pass custom attributes as needed.
