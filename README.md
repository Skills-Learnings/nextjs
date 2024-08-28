

# Data Handling Fundamental

## Topics covered in this section of course
1. Data Fetching and Caching
	- Data Fetching
	- Request Memoization Cache
	- Data cache
	- Full Route Cache
	- Router Cache
2. Rendering
	- Server vs Client Components
	- Dynamic vs Static
	- Dynamic Functions
 

## Learnings

### 1.1 Data Fetching
Data fetching in Next.js is a fundamental aspect of building dynamic applications. Next.js offers flexibility in how you fetch data, allowing you to do it on both the server and client sides, depending on your needs. The method you choose impacts how your data is cached and rendered, which will be covered further in later sections.

1. **Fetching Data on the Server**
	 - When fetching data on the server, you typically use the `fetch` API or establish a direct connection to a database.
	  - Server-side data fetching is performed in Next.js components, which are server components by default.  
	  - This means that when you request data using `fetch` or a direct database query, the request is processed on the server before the page is rendered. 
	   - This approach is useful because it ensures that the data is available when the page is delivered to the client, leading to faster page loads and improved SEO.
	   - In the case of using a `fetch` request, you make an HTTP call to retrieve data from an external API or service. Alternatively, you might connect directly to a database or another data source, such as reading from a file system or an in-memory data store. 
	  - Regardless of the method used, the server handles these operations, and the results are passed to the component for rendering.
2. **Fetching Data on the Client**
	- Sometimes, you might need to fetch data on the client side, for example, when you require user-specific data that should not be fetched on the server. 
	- In these cases, you'll rely on React hooks like `useState` and `useEffect` to manage data loading, state, and rendering. 
	- When fetching data on the client side, you'll also need to handle the loading and error states manually, showing appropriate feedback to the user during the data retrieval process. 
	- Client-side data fetching occurs after the initial page load, meaning the page is rendered without the data initially and then updated once the data is fetched. T
	- his approach is useful for dynamic content that changes frequently or needs to be personalized based on user interaction.
3. **Parallel vs. Serial Data Fetching**
	- A key optimization in data fetching is to fetch data in parallel rather than serially whenever possible. 
	- Fetching data serially involves waiting for each request to complete before starting the next one, which can slow down the overall process. 
	- In contrast, fetching data in parallel allows multiple requests to be processed simultaneously, significantly reducing the time required to gather all necessary data. 
	- This parallel fetching can be achieved by using techniques like `Promise.all`, which allows you to run multiple asynchronous operations at once and only proceed when all of them are completed. 
	- Whether you're making `fetch` requests, querying a database, or performing other asynchronous operations, parallel fetching is a powerful way to optimize performance.
4. **Key Consideration: Cache Interaction**
	- One of the most important aspects of data fetching in Next.js is how your data interacts with the cache.
	- Whether you're fetching data via an HTTP request, a database query, or another method, the primary difference lies in how these operations are cached. This affects not only the performance of your application but also how up-to-date your data is when it reaches the user.
5. **Summary**
	- In summary, Next.js gives you the flexibility to fetch data on the server or client side, and the choice between them depends on your specific use case. 
	- Always consider fetching data in parallel to optimize performance, and be mindful of how caching impacts your data fetching strategy. 
	- The intricacies of caching and its impact on data fetching will be discussed further in the next sections.

### 1.2 Request Memoization cache
In Next.js, request memoization cache is an optimization technique that caches the results of fetch requests to enhance performance. When you make multiple fetch requests with the same parameters, Next.js can return the cached result from the first request, avoiding redundant network calls. This feature helps speed up response times and reduce server load, particularly for static or rarely-changing data.
1. **What is Request Memoization Cache?**
	- Request memoization cache automatically stores the results of fetch requests during server-side rendering.
	- For example, if your application fetches a list of todos multiple times, Next.js will cache the result of the first request. 
	- Subsequent requests with the same parameters will return the cached data instead of making a new HTTP call.
2. **Duration of Memoization Cache**
	- The memoization cache in Next.js persists for the lifetime of the server instance. Once the server process restarts or the application is redeployed, the cache is cleared. 
	- This cache duration ensures that your application can efficiently handle repeated data requests while the server is running.
3. **Disabling Memoization Cache**
	- In some cases, you may need to ensure that each fetch request retrieves fresh data. To disable the memoization cache, you can use the `AbortController` API to signal that the request should not be cached.
	- **Example**:
		```ts
		export function getTodos() {
		  const controller = new AbortController();
		  return fetch(`${process.env.API_URL}/todos`, { signal: controller.signal })
		    .then((res) => res.json())
		    .then((data) => data as Todo[]);
		}
		``` 
	- In this example, the `AbortController` is used to send a signal along with the fetch request, effectively preventing Next.js from caching the result.
4. **Request Memoization with Non-Fetch Requests**
	- While Next.js automatically memoizes `fetch` requests, other data-fetching methods require manual memoization using the `cache` function from React.
	- **Example:**
	```ts
	import { cache } from 'react';

	export const getData = cache(() => {
	  console.log("Cache function called");
	  return Promise.resolve({ data: "This is some data", data2: "This is some data2" });
	});
	```
	- In this example, the `cache` function is used to memoize the result of a custom data-fetching function. The function’s output is cached and reused for future invocations with the same parameters.
5. **Testing Memoization Cache**
	- It's important to note that request memoization cache is disabled in the development environment. This allows developers to always work with fresh data. To test how memoization works, you need to build and run your application in production mode:
		```bash
		npm run build
		npm start
		``` 
	- Running your application in production mode enables the memoization cache, letting you observe the performance improvements.
6. **Interaction with Route Cache**
	- If a route is static, the route cache in Next.js can override the memoization cache by saving the entire page as a static asset during the production build. This means that both the page and its data are served as static content, bypassing the memoization cache.
	- To force dynamic behavior and prevent route caching on a page, you can use the following constants:
		```ts
		export const dynamic = 'force-dynamic';
		export const revalidate = 0;
		``` 
	- These constants ensure that the page is treated as dynamic, allowing the memoization cache to function and preventing the page from being served as a static asset.

7.  **Summary**
	- Request memoization cache in Next.js is a powerful feature that caches the results of fetch requests to optimize performance. 
	- It works automatically with `fetch` requests but can be extended to other functions using React's `cache` function. 
	- The cache is effective in production environments, and understanding its interaction with route cache is crucial for building efficient applications. 
	- When necessary, we can disable memoization using `AbortController` to ensure fresh data retrieval.

### 1.3 Data cache
Next.js provides a robust data caching mechanism that significantly improves performance by storing a cached version of data fetched from APIs or databases. This cache, referred to as the "data cache," serves as the very last cache layer between your application and the data source (like a database or an API).

1. **What is Data Cache?**
	- The data cache in Next.js is persistent across all requests and remains intact even through server restarts, application deployments, and changes to your code. 
	- Once data is cached, it stays in the cache until explicitly invalidated. 
	- This persistence means that the cache is shared across different pages that require the same data, reducing redundant requests and speeding up page loads.
2. **Revalidating Data Cache**
	- To ensure that your cached data remains up-to-date, you can set a revalidation interval using the `revalidate` option on a specific fetch request. 
	- When you set a `revalidate` interval, the cached data will remain valid until the interval expires. 
	- However, it’s important to note that the updated data is not returned immediately after the interval ends. Instead, on the first request after the interval finishes, Next.js will make a new API or database request to refresh the cache. 
	- The updated data is then returned on the second request.
	- **Example:**
		```ts
		export async function getData() {
		  const data = await fetch('https://api.example.com/data', { next: { revalidate: 10 } });
		  return data.json();
		}
		``` 
3. **Revalidating an Entire Page**
	- You can also define revalidation for an entire page by setting the `revalidate` option at the page level. This approach is useful when you want the entire page to revalidate its data after a certain period.
	- Example:
		```ts
		export const revalidate = 60; // Revalidate every 60 seconds
		```
4. **On-Demand Revalidation**
	- On-demand revalidation in Next.js allows you to control when cached data should be refreshed, providing flexibility in how and when your application's data is updated. 
	- This approach can be particularly useful for dynamic content that changes unpredictably or requires frequent updates without the need to wait for a standard revalidation interval to expire. 
	- There are three primary methods for on-demand revalidation: time-based, path-based, and tag-based revalidation.- 
		1. **Time-Based Revalidation**
			- Time-based revalidation automatically refreshes the cached data after a specified interval. This method ensures that data is periodically refreshed, providing a balance between performance and data accuracy.
			- Example:
				```ts
				export function getTodosLimited() {
				  // Fetch request with time-based revalidation set to 10 seconds
				  return fetch(`${process.env.API_URL}/todos/1`, { next: { revalidate: 10 } })
				    .then((res) => res.json())
				    .then((data) => data as Todo[]);
				}
				``` 
			- In this example, the data returned by the `getTodosLimited` function will be revalidated every 10 seconds. After 10 seconds, the next time this function is called, it will make a new request to the API to fetch the latest data and update the cache.
		2. **Path-Based Revalidation**
			- Path-based revalidation allows you to trigger cache invalidation for a specific URL path. This is useful when you want to ensure that data for a specific route is refreshed, typically after some operation or event in your application.
			- **Example:**
				```ts
				import { revalidatePath } from "next/cache";

				export default function Revalidate() {
				  // Trigger revalidation for the path "/test"
				  revalidatePath("/test");
				  return <h1>Revalidate test route</h1>;
				}
				``` 
			- In this example, the `revalidatePath("/test")` function call invalidates the cache for the `/test` path. The next time a request is made to this path, the data will be freshly fetched from the API or database, ensuring that the content is up-to-date.
		3. **Tag-Based Revalidation**
			- Tag-based revalidation provides a more granular approach by allowing you to associate specific tags with your cached data. You can then revalidate all cache entries associated with a particular tag, making it a powerful tool for managing data that is shared across multiple parts of your application.
			- Example:
				```ts
				export function getTodosLimited() {
				  // Fetch request with tag-based revalidation
				  return fetch(`${process.env.API_URL}/todos/1`, { next: { tags: ["todo", "1"] } })
				    .then((res) => res.json())
				    .then((data) => data as Todo[]);
				}

				import { revalidateTag } from "next/cache";

				export default function Revalidate() {
				  // Trigger revalidation for the "todo" tag
				  revalidateTag("todo");
				  return <h1>Revalidate test route</h1>;
				}
				``` 
		- In the `getTodosLimited` function, the data is tagged with `["todo", "1"]`. Later, in the `Revalidate` component, calling `revalidateTag("todo")` triggers revalidation for all cached entries that have the `todo` tag. This is particularly useful when the same piece of data is used in multiple places, as it allows you to update all relevant caches in one go.
5. **Opting Out of Data Cache**
	- In certain scenarios, you may want to bypass the data cache entirely to ensure that every request retrieves fresh data. You can opt out of caching for a specific fetch request by using the `cache: "no-store"` option.
	- Example:
		```ts
		export async function getData() {
		  const data = await fetch('https://api.example.com/data', { cache: "no-store" });
		  return data.json();
		}
		``` 
	- For full-page cache opt-out, you can use the `dynamic = "force-dynamic"` constant. This ensures that the page is treated as dynamic, bypassing both the data and route caches.
6. **Database Requests with `unstable_cache`**
	- Next.js also offers an `unstable_cache` function for caching the results of database requests. This function works similarly to the data cache for fetch requests, but it is specifically designed to handle the unique requirements of database queries.
	- Example:
		```ts
		import { unstable_cache } from 'next/cache';

		export const getData = unstable_cache(async () => {
		  const data = await database.query('SELECT * FROM table');
		  return data;
		}, []);
		``` 
	- The `unstable_cache` function allows you to cache the results of database queries across multiple requests, improving performance while maintaining data consistency.
7. **Summary**
	- Next.js's data cache is a powerful feature that caches data across requests, deployments, and page navigations, ensuring fast data retrieval. 
	- It supports revalidation based on time, paths, and tags, and allows you to opt out of caching when needed. 
	- The `unstable_cache` function further extends caching capabilities to database requests, making it easier to manage and optimize data fetching in your applications.

### 1.4 Full Route Cache
The Full Route Cache in Next.js is designed to optimize the performance of your application by caching the HTML output of your pages on the server. This cache plays a crucial role in reducing the time the server spends rendering HTML that it sends to the browser. Here's how it works and how you can utilize it effectively:

1. **How Full Route Cache Works**
	- **HTML Caching**: The Full Route Cache stores the HTML generated by your server for each page. This cache includes the HTML for each individual server component that makes up the page.
	- When a request is made for a cached page, the server can quickly serve the pre-rendered HTML without needing to re-render the components, saving valuable processing time.    
2. **Static vs. Dynamic Pages**: 
    -   **Static Pages**: 
	    - These are pages where the content does not change frequently, such as a listing page (e.g., a list of todos). 
	    - For static pages, the Full Route Cache is built at build time, caching the entire HTML output. This cached HTML is then served for all subsequent requests, making the page load much faster.
    -   **Dynamic Pages**: 
	    - These are pages where the content changes frequently, such as a detailed page for a single todo. 
	    - For dynamic pages, the Full Route Cache is skipped because the content needs to be generated on each request to ensure it’s up-to-date.
3. **Fetch Requests**: 
	- The Full Route Cache also caches the results of fetch requests. 
	- If a static page makes a fetch request, the data retrieved from the request is cached along with the HTML, meaning the server doesn’t need to fetch the data again for subsequent requests.
4. **Persistence Across Requests**
	- The Full Route Cache is persistent across all requests, meaning that once the HTML is cached, it is served for every request to that page until the cache is invalidated. 
	- However, this cache is only persistent for a single deployment. If you redeploy your application, the cache is reset, and pages will need to be re-cached.
5. **Revalidation of Full Route Cache**
	- While the Full Route Cache is incredibly efficient, there are cases where you may need to clear or revalidate this cache to ensure your application serves the most current data. You can use the `revalidatePath` function to trigger a revalidation of the cache for a specific path.
	- Example:
		```ts
		import { revalidatePath } from "next/cache";

		export default function Revalidate() {
		  // Trigger revalidation for the path "/todos"
		  revalidatePath("/todos");
		  return <h1>Revalidate todos route</h1>;
		}
		``` 
	- In this example, the `revalidatePath("/todos")` function invalidates the cached HTML for the `/todos` path. The next time a request is made to this path, the server will regenerate the HTML, cache it again, and then serve it.

5. **Built on Top of Other Caches**
	- The Full Route Cache is built on top of other caching mechanisms in Next.js, such as Request Memoization and Data Cache. 
	- While Request Memoization and Data Cache store raw API data or database results, the Full Route Cache goes a step further by storing the fully rendered HTML. 
	- This means that the server doesn’t just skip fetching data; it also skips the entire process of converting that data into HTML, resulting in significant performance gains.

6. **Summary**
	- The Full Route Cache is a powerful tool in Next.js that helps optimize your application's performance by caching HTML output on the server. 
	- It is particularly effective for static pages where content doesn’t change frequently. 
	- However, for dynamic pages, this cache is skipped to ensure the most up-to-date content is served. The cache can be revalidated when needed, ensuring a balance between performance and data accuracy.

### 1.5 Router Cache
The Router Cache in Next.js is a client-side caching mechanism that enhances the performance of your application by storing data specific to the user's session. Here’s a breakdown of how it works and how you can interact with it:
1. **Client-Side Storage**
	-   **Location**: Unlike the Full Route Cache, which is stored on the server, the Router Cache is stored on the client. 
	- This cache is responsible for storing the results of component rendering, making subsequent navigations and interactions faster.
2. **Component-Based Caching**
	-   **Granularity**: The Router Cache works on a component basis rather than caching entire pages. 
	- This means that when a user navigates through different components or views within your application, the Router Cache can quickly serve the pre-rendered components from memory without having to re-render them from scratch.
3. **Session-Based and Time-Based**
	-   **Session-Based**: The Router Cache is tied to the user's session. This means that if a user closes their browser or navigates away and returns later, the cache is reset, starting a brand new session. This ensures that stale data doesn’t persist across different user sessions.    
	-   **Time-Based Revalidation**:    
	    -   **Dynamic Pages**: For dynamic pages (those that frequently update), the Router Cache automatically revalidates the cached components every 30 seconds. This ensures that users receive relatively fresh content while still benefiting from caching.
	    -   **Static Pages**: For static pages (those that don’t change often), the Router Cache has a 5-minute duration for automatic revalidation. This longer duration is suitable because the content is less likely to change frequently.
4. **Automatic Cache Update**
	-   **Last Cache in the Chain**: The Router Cache is the final cache in the caching hierarchy. 
	- When any of the preceding caches (e.g., Full Route Cache, Data Cache) are updated, the Router Cache is automatically cleared and updated. This ensures consistency in the data presented to the user.
5. **Manual Revalidation**
	-   **router.refresh**: If you need to manually revalidate the Router Cache during a user session, you can use the `router.refresh()` function. This is particularly useful in scenarios where data is updated in real-time, and you want to ensure the user sees the most current information without waiting for the automatic revalidation period to expire.
	- Example:
		```ts
		import { useRouter } from 'next/router';

		export default function RefreshComponent() {
		  const router = useRouter();

		  const handleRefresh = () => {
		    // Manually revalidate the Router Cache
		    router.refresh();
		  };

		  return (
		    <div>
		      <button onClick={handleRefresh}>Refresh Data</button>
		    </div>
		  );
		}
		``` 

	- In this example, when the "Refresh Data" button is clicked, the `router.refresh()` function is triggered, forcing the Router Cache to revalidate and fetch the most up-to-date content.

6. **No Opt-Out Option**
	-   **Mandatory Cache**: One key aspect of the Router Cache is that it’s mandatory. Unlike some other caching mechanisms in Next.js, you cannot opt out of the Router Cache. This ensures that all users benefit from the performance improvements it provides, regardless of how the application is used.

7. **Summary**
	- The Router Cache in Next.js is a powerful client-side caching system that enhances performance by storing component-specific data based on the user's session. 
	- It operates on a time-based revalidation schedule and is automatically updated whenever upstream caches are refreshed. 
	- While you can manually trigger cache revalidation with `router.refresh()`, you cannot opt out of this cache, ensuring that all users experience the benefits of faster navigation and interaction within your application.

### 2.1 Server vs Client Components
In Next.js, understanding the difference between server and client components is crucial for optimizing performance and ensuring that your application behaves as expected.

1. **Server Components**
	- **Default Behavior**: By default, all components in Next.js are server components unless explicitly marked as client components.
	- **No Console Logs**: Server components do not log anything in the browser's console because they run exclusively on the server.
	- **Working Mechanism**:
	    -   **Rendering**: Server components render all the code on the server and send it to the client in a special binary format. This means the HTML sent to the client is pre-rendered, reducing the amount of work the client needs to do.
	    -   **Caching**: Next.js heavily relies on caching to minimize the number of requests sent to the server. This is because server requests are often the slowest and most resource-intensive part of most applications.
	- **Reasons to Use Server Components**:
        -   **Performance**: Running code on the server, which is likely more powerful than the client’s machine, makes server components faster.
	    -   **Asynchronous Fetching**: Server components can fetch data asynchronously, leveraging features like loading and error handling that Next.js provides.
	    -   **Security**: Sensitive operations, such as API calls, remain on the server, protecting client credentials.
	    -   **Reduced Bundle Size**: Since the code runs on the server, JavaScript and library code stay on the server, reducing the bundle size sent to the client.
	- **When Server Components Can't Be Used**:    
	    -   **User Interactivity**: Server components can’t handle user interactivity, like event listeners (`onClick`, `onMouseOver`), because they run on the server.
	    -   **Browser APIs**: Operations that require browser-specific objects, such as the DOM, `window`, or `navigator` objects, cannot be handled by server components.
	    -   **React Hooks**: Hooks like `useState` and `useEffect` must be used in client components since they deal with state management and side effects that happen on the client.
2. **Client Components**
	-  **Marking Client Components**:    
	    -   To designate a component as a client component, add the `"use client"` directive at the top of the file.
	- **Working Mechanism**:    
	    -   **Dual Execution**: Client components first run on the server to gather as much data as possible. Then, the rendered HTML is sent to the client, where it re-renders the remaining code.
	    -   **Hydration**: The initial HTML is sent to the client, which then "hydrates" it by connecting the HTML to the React logic. This process allows the page to become interactive after the initial render.
	- **Server-Client Barrier**:    
	    -   **One-Way Transition**: Once a component is marked as a client component, any component it imports and any child component it renders must also be a client component. You cannot revert to server components once inside a client component.
	    -   **Barriers**: This creates a barrier where everything after the first client component is also a client component. It’s important to structure your application so that you only move to client components when necessary.
	- **Note on Client Components**:    
	    -   Client components only run on the server the first time the page is loaded. After that, the client takes over, and subsequent navigations render components exclusively on the client.
3. **Rendering Server Components in Client Components:**
	-   **Workaround:** To maintain the server-side nature of a component within a client component, import and execute the server component in the server component itself and pass it down as a child or prop to the client component.
4. **Using Third-Party Libraries:**
	-   **Custom Client Components:** If a third-party library doesn't include the `"use client"` directive, you can wrap it in a custom client component and use it where needed.
5. **Server-Only and Client-Only Libraries:**
	-   **Purpose:** These libraries allow you to specify that certain components or modules should only be used with server components or client components, respectively, enforcing separation where needed.
6. **Conculsion**
By understanding the distinction between server and client components, you can effectively optimize your Next.js application for performance, security, and user experience.
### 2.2 Dynamic vs Static
In Next.js, understanding whether a page is dynamic or static is crucial for optimizing performance and ensuring that your application behaves as expected.
1. **Dynamic Page**
	- A dynamic page regenerates itself every time a user requests it, ensuring that the content is always up-to-date. This is useful for pages that rely on frequently changing data or user-specific content.
2. **Static Page**
	- A static page, on the other hand, uses a pre-built version that is served to the user. It only rebuilds when necessary, such as when you invalidate your cache or when a revalidation time expires. 
	- Static pages are generally more performant because they avoid the overhead of regenerating the content on each request.
3. **Key Differences**
	-  **Dynamic Pages**: Always re-render on each request, providing the latest data but at the cost of performance.	
	- **Static Pages**: Serve pre-rendered content, re-rendering only when needed, which boosts performance but may not always show the latest data.
	- By default, Next.js aims to render pages as static whenever possible. However, if you use dynamic features or explicitly specify that a page should be dynamic, Next.js will treat it accordingly.
4. **Caching and Its Role**
	- Caching plays a significant role in determining whether a page is dynamic or static. 
	- If a page's data is cached, it can be served as a static page. If not, the page must be dynamic. 
	- The interaction with the cache determines how the page is rendered, rather than just the presence of dynamic functions.
5. **Opting into Dynamic Pages**
You're correct that `dynamic = "force-dynamic"` is used for setting an entire page as dynamic, while `unstable_noStore` is used to make specific functions or components dynamic. Let's clarify these concepts with the correct usage:
	1. **Dynamic Page with `dynamic = "force-dynamic"`**
		- When you want to ensure that an entire page is dynamic, meaning it regenerates every time a user requests it, you use the `dynamic = "force-dynamic"` export. 
		- This is useful for pages where the content needs to be updated with every request, such as live data feeds or personalized content.
		- **Example:**
			```ts
			// Random/page.tsx
			export const dynamic = "force-dynamic";

			export default function Random() {
			  return <h1>{Math.random()}</h1>;
			}
			``` 
		- In this example, the `Random` page will regenerate on every request, ensuring a new random number is displayed each time.
	2. **Making Specific Functions or Components Dynamic with `unstable_noStore`**
		- For cases where you need to make only a specific function or component dynamic, rather than the entire page, you can use the `unstable_noStore` function. 
		- This function signals to Next.js that the component or function should not be cached and must be dynamically rendered on every request.
		- **Example:**
			```ts
			import { unstable_noStore } from "next/cache";

			export default function RandomNumber() {
			  /* Example making a specific function or component dynamic using unstable_noStore */
			  unstable_noStore();
			  return <h1>{Math.random()}</h1>;
			}
			``` 
		- In this example, the `RandomNumber` component will always generate a new random number each time it is rendered, regardless of the caching status of the rest of the page. 
		- **Note** that `unstable_noStore` is not currently stable, meaning it may change in future releases of Next.js.
	3. **Summary of Usage**
		-   **`dynamic = "force-dynamic"`**: Use this when you need an entire page to be dynamically rendered on every request.
		-   **`unstable_noStore`**: Use this to make specific components or functions dynamic within a page that might otherwise be static.
### 2.3 Dynamic Functions
1. **Overview of Built-In Dynamic Functions in Next.js**
	- **cookies()**
		-   **What it Does**: The `cookies()` function allows you to read and manipulate cookies on both the server and client sides. This function is dynamic because it interacts with request-specific data that can change with each request.
		-   **Usage**:    
		    ```ts
		    import { cookies } from 'next/headers';
		    
		    export default function Example() {
		      const cookieStore = cookies();
		      const userToken = cookieStore.get('user-token');
		      return <div>{userToken?.value}</div>;
		    }
		    ``` 
	- **headers()**
		-   **What it Does**: The `headers()` function provides access to the request headers. This is useful for reading data like authorization tokens, content types, etc., and is inherently dynamic as headers can differ with each request.
		-   **Usage**:    
		    ```ts
		    import { headers } from 'next/headers';
		    
		    export default function Example() {
		      const requestHeaders = headers();
		      const userAgent = requestHeaders.get('user-agent');
		      return <div>{userAgent}</div>;
		    }
		    ``` 
2. **Overview of Built-In Dynamic Parameters**
	- **searchParams**
		-   **What it Does**: `searchParams` is used to handle URL query parameters. It's dynamic because the parameters can change depending on the user’s input or URL modifications. In server components, it’s accessed directly.    
		-   **Usage in Server Component**:    
		    ```ts
		    export default function Example({ searchParams }: { searchParams: URLSearchParams }) {
		      const filter = searchParams.get('filter');
		      return <div>Filter: {filter}</div>;
		    }
		    ```     
		-   **Multiple Values**: If a query parameter has multiple values with the same key, it will be converted into an array.
        
		    ```ts
		    const tags = searchParams.getAll('tag'); // ['tag1', 'tag2']
		    ```
	- **useSearchParams()**
		-   **What it Does**: This is a React hook that allows you to access and manipulate `searchParams` in client components. It provides reactivity, so components can react to changes in query parameters.
		-   **Usage in Client Component**:    
		    ```ts
		    'use client';
		    
		    import { useSearchParams } from 'next/navigation';
		    
		    export default function Example() {
		      const searchParams = useSearchParams();
		      const filter = searchParams.get('filter');
		      return <div>Filter: {filter}</div>;
		    }
		    ``` 
These dynamic functions and parameters allow you to interact with request-specific data, making your Next.js applications more flexible and powerful.
