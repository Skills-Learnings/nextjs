# Blog and Form Management
## Topics covered in this section of course
1. Rendering
	- Static Paths
2. Data Mutation
	- Server Actions With Forms
	- Server Actions Not In Forms
	- useOptimistic
	- useFormStatus & useFormState
 
## Learnings
### 1.1  Static Paths(Pages)
In Next.js, when dealing with dynamic pages, you often want to pre-render some of these pages at build time for performance reasons. This can be done using the `generateStaticParams` function, which allows you to specify which dynamic routes should be pre-rendered as static pages.
- Let’s break down the below example:
```ts
import { getTodo } from "@/api/api"

type Params = {
  params: { todoId: string }
}

// Indicate that the params will not change dynamically at runtime
export const dynamicParams = false

// Generate static paths for the dynamic routes
export async function generateStaticParams() {
  return [{ todoId: "1" }, { todoId: "2" }]
}

export default async function page({ params: { todoId } }: Params) {
  const todo = await getTodo(todoId)
  console.log(todo.id)
  return <h1>Todo: {todo.title}</h1>
}
``` 
1. **Explanation:**
	1. **`dynamicParams = false`:**    
	    -   This property tells Next.js that the dynamic parameters (in this case, `todoId`) do not change at runtime. This means that only the parameters generated during the build process will be used to pre-render pages. 
	    - If the parameters do change or new ones are added, they won't be pre-rendered, and Next.js won’t attempt to generate them on the fly.
	2.  **`generateStaticParams`:**    
	    -   The `generateStaticParams` function is where you define the specific dynamic routes that you want to pre-render as static pages.
	    -   In this example, it returns an array of objects, each containing a `todoId`. These IDs correspond to the dynamic segments of your page routes.
	    -   For example, the routes `/todos/1` and `/todos/2` will be pre-rendered during the build process.
	3. **404 Handling:**
		-   Since `dynamicParams` is set to `false`, if someone tries to access `/todos/3` (which wasn't declared in `generateStaticParams`), Next.js knows that this is not a valid route and will serve a 404 page.
	4.  **Page Component (`page`):**    
	    -   The page component is where you fetch the data and render it. Since this component is asynchronous, it fetches the `todo` data based on the `todoId` passed in as a parameter.
	    -   The `todoId` is obtained from the URL, and then the data is fetched using the `getTodo` function (which is a function that calls an API to get the specific to-do item).
	    -   The fetched `todo` object is then used to render the page with the title of the to-do item.
2. **Key Benefits:**
	-   **Performance Optimization:** By pre-rendering these dynamic pages, you improve the performance of your application. Instead of generating these pages on every request, Next.js serves the pre-built static pages, which are faster to load.	    
	-   **Static Generation with Dynamic Routes:** This approach allows you to combine the best of both static and dynamic content. Pages that don’t change frequently can be pre-rendered, while those that require real-time data can still be dynamic.	    
	-   **SEO Benefits:** Pre-rendered static pages are also beneficial for SEO since they are ready to be crawled by search engines without needing JavaScript to run.
3. **When to Use:**
	-   Use this approach when you have a known set of dynamic routes that you want to optimize by pre-rendering them as static pages. 
	- For example, in a blog or product catalog where certain pages are accessed frequently and don’t change often, pre-rendering these pages can greatly enhance the performance and SEO of your site.

### 2.1 Server Actions With Forms
In Next.js, handling form submissions entirely on the server is straightforward, allowing you to maintain a clean separation between server and client code. Here’s an overview of how server actions work with forms, including the role of closures in server actions:

1. **Server-Side Form Handling**
	-   In Next.js, you can handle form submissions directly on the server. Instead of specifying a URL in the form’s `action` attribute, you pass a server function. This server function, known also as a server action, handles the form submission on the server side.    
	-  **Example:**    
	    ```ts
	    export default function MyForm() {
	      async function handleSubmit(formData: FormData) {
	        "use server";
	        // Process form data on the server
	      }
	    
	      return (
	        <form action={handleSubmit}>
	          <input name="username" />
	          <button type="submit">Submit</button>
	        </form>
	      );
	    }
	    ``` 
    
	 - In this example, `handleSubmit` is a server action that runs on the server when the form is submitted. Next.js automatically makes a fetch request to this server action with the form data.
2. **Marking Functions as Server Actions**
	-   Server actions are marked using the `"use server"` directive. This directive indicates that the function should run on the server.
    -   **Server Actions Must Be Asynchronous:**  
    Server actions must be asynchronous (`async`) because Next.js sends a fetch request, and fetch requests are inherently asynchronous.
    -   **Form Data Handling:**  
    When a form is submitted, Next.js sends the data to the server action as a `FormData` object, which the server action can then process.
3. **Cache Handling**
	-   After performing a server action, clearing the cache may be necessary to reflect the changes on the client. If the cache holds old data, the client might display stale content.
    -  **Example:**    
	    ```ts
	    async function handleSubmit(formData: FormData) {
	      "use server";
	      // Process form data
	      // Clear cache to reflect changes
	    }
	    ``` 
4. **Forms with JavaScript Disabled**
	-   If JavaScript is disabled in the browser, the form will still work, but it will cause a full page refresh to ensure everything functions correctly.
5. **Server Actions Inside Client Components**
	-   **Server-Client Boundary:**  
    Server actions cannot be directly used inside client components. Once you enter the client-side boundary, server-side logic cannot be executed.    
	-   **Passing Server Actions to Client Components:**  
    To use server actions in client components, pass them as props from a parent server component. Server actions are special functions in Next.js that can be passed between server and client, even though typically only serializable data (like strings, numbers, etc.) can be passed.
    -  **Example:**    
	    ```ts
	    export default function ParentComponent() {
	      async function handleSubmit(formData: FormData) {
	        "use server";
	        // Process form data
	      }
	    
	      return <ClientComponent onSubmit={handleSubmit} />;
	    }
	    
	    function ClientComponent({ onSubmit }) {
	      return (
	        <form action={onSubmit}>
	          <input name="username" />
	          <button type="submit">Submit</button>
	        </form>
	      );
	    }
	    ``` 
6. **Avoiding Prop Drilling**
	-   To avoid prop drilling (passing down props through multiple levels of components), you can move the server actions to a separate file. By doing so, you simplify the component structure and improve maintainability.
    -   **Example:**    
	    ```ts
	    // actions.js
	    "use server";
	    
	    export async function handleSubmit(formData: FormData) {
	      // Process form data
	    }
	    
	    // MyForm.js
	    import { handleSubmit } from "./actions";
	    
	    export default function MyForm() {
	      return (
	        <form action={handleSubmit}>
	          <input name="username" />
	          <button type="submit">Submit</button>
	        </form>
	      );
	    }
	    ``` 
7. **Three Ways to Use Server Actions**
	-   **Inline in Server Components:** Define and use the server action directly within the server component.
	-   **With Client Components:** Pass the server action as a prop from the server component to the client component.
	-   **Separate File for Actions:** Create a separate file for server actions and import them where needed.

8. **Handling Single Data Values**
	-   Instead of handling the entire `FormData`, you can pass single data values directly to server actions. You’ll need to cast the value to the appropriate type within the server action.
   -   **Example:** 
    ```ts
    async function handleUsername(username: string) {
      "use server";
      // Process the username
    }
    
    export default function MyForm() {
      return (
        <form action={() => handleUsername("john_doe")}>
          <button type="submit">Submit</button>
        </form>
      );
    }
    ```
9. **Server Actions and Closures**
	-   **How Server Actions Work with Closures:**
	    -   In Next.js, when a server action references variables that are declared outside of the server action function but inside a server component, Next.js encrypts those variables and includes them in the `FormData` object. This encrypted data is passed to the client when the form is submitted.        
	    -   When the server action is triggered, Next.js takes the encrypted data from the `FormData` object, sends it back to the server, decrypts it, and then uses it to perform the server action.        
    -   **Example Scenario:**        
        -   If you create a server action inside a server component and use a variable declared outside the server action function, in normal JavaScript, this would work seamlessly due to scoping and closures. However, because there's a client-server boundary, Next.js handles this differently.            
        -   Next.js needs to take all variables used inside the server action function and pass them down to the client. To protect sensitive information, Next.js encrypts this data before sending it to the client.            
        -   Upon receiving a request back on the server, Next.js decrypts the data, ensuring that sensitive information, such as passwords, is not exposed.            
    -   This encryption-decryption process allows Next.js to maintain the integrity of server actions even when dealing with client-server boundaries, ensuring that sensitive information is handled securely.
        

By understanding these concepts, you can effectively manage form submissions, server actions, and closures in Next.js, maintaining secure and efficient server-client interactions.

### 2.2 Server Actions Not In Forms
Server actions in Next.js are typically associated with form submissions, but they can also be used independently of forms. Here's how they work and some best practices to consider:
1. **Using Server Actions Without Forms**
	-   **Similar to Form-Based Server Actions:**  
    Server actions without forms function similarly to those used in forms. The key difference is that instead of automatically handling form data, you manually pass the necessary data to the server action.    
	-   **Example:**    
	    ```ts    
	    async function updateData(data: string) {
		  "use server";
	      // Perform some server-side operation with the data
	    }
	    
	    function MyComponent() {    
	      return <button onClick={async () => {await updateData("some value")}}>Update Data</button>;
	    }
	    ``` 
    - In this example, the `updateData` server action is called when the user clicks the button, and it manually receives the data it needs to process.
    

2. **Event Listeners and Awaiting Server Actions**
	-   **Triggering via Event Listeners:**  
    Server actions without forms are usually triggered by event listeners (e.g., `onClick`, `onChange`). As long as the server action is called within an event listener and you ensure that it is awaited, the server action will work as expected.    
	-   **Loading State:**  
    Since server actions involve network requests, it's important to manage user experience by showing a loading state. This informs the user that an operation is in progress.    
	-   **Using `useTransition`:**    
	    ```ts
	    import { useTransition } from "react";
	    
	    function MyComponent() {
	      const [isPending, startTransition] = useTransition();
	    
	      function handleClick() {
	        startTransition(async () => {
	          await updateData("some value");
	        });
	      }
	    
	      return (
	        <button onClick={handleClick}>
	          {isPending ? "Loading..." : "Update Data"}
	        </button>
	      );
	    }
	    ``` 
		-  In this example, `useTransition` is used to handle the loading state while the server action is being performed, improving the user experience.
3. **Server Actions in `useEffect`**
	-   **Not Recommended:**  
    Using server actions inside `useEffect` is generally discouraged because server actions are usually triggered by user interactions (e.g., clicking a button). Using them in `useEffect` can lead to unintended side effects and make the code harder to maintain.    
	-   **Niche Use Cases:**  
    There are specific scenarios where using a server action in `useEffect` might make sense, such as analytics. For example, logging page views each time a user navigates to a different page could be a valid use case for server actions in `useEffect`.    
	-   **Example Use Case:**    
	    ```ts
	    useEffect(() => {
	      async function logPageView() {
	        "use server";
	        await logAnalytics("page view");
	      }
	    
	      logPageView();
	    }, []);
	    ``` 
    
	    - In this case, the server action is used to log an analytics event when the page loads. However, this is an exception rather than the rule, and such use should be carefully considered.
    

In summary, server actions without forms in Next.js provide flexibility for handling server-side logic triggered by user events. However, it's important to use them appropriately, primarily within event listeners and not in `useEffect`, unless you have a specific need, like logging analytics data.

### 2.3 useOptimistic
`useOptimistic` is a React hook that helps manage optimistic updates, allowing you to update the UI immediately while waiting for a server response. This is particularly useful for enhancing the user experience by making the app feel more responsive. The `useOptimistic` hook lets you bypass the need for `useTransition` when handling state changes that need to be reflected immediately in the UI.

1. **How `useOptimistic` Works:**
	- In a typical scenario, when a user interacts with a UI element like a checkbox, the state change is sent to the server, and the UI is only updated once the server responds.
	- With `useOptimistic`, you can update the UI immediately with an assumed successful outcome (optimistic update), while the actual server request is processed in the background. 
	- If the server request fails, you can then revert the optimistic update.
2. **Removing `useTransition`:**
	- Normally, `useTransition` is used to show a pending state while waiting for a server response, but with `useOptimistic`, this is not necessary because the UI is updated optimistically.
3. **Example**
	- Here’s how you can implement this with a todo list:
		```ts
		"use client"

		import { toggleTodo } from "@/actions/todos"
		import { useOptimistic } from "react"

		export function TodoItem({
		  id,
		  title,
		  completed,
		}: {
		  id: number
		  title: string
		  completed: boolean
		}) {
		  // Initialize optimistic state based on current completion status
		  const [optimisticCompleted, setOptimisticCompleted] = useOptimistic(completed)

		  return (
		    <li>
		      <label>
		        <input
		          type="checkbox"
		          checked={optimisticCompleted} // Reflect optimistic state in the UI
		          onChange={async (e) => {
		            setOptimisticCompleted(e.target.checked) // Update UI immediately
		            await toggleTodo(id, e.target.checked) // Send actual request to server
		          }}
		        />
		        {title}
		      </label>
		    </li>
		  )
		}
		``` 

4. **Breakdown of the Code:**
	-   **`useOptimistic` Hook**: Initializes an optimistic state (`optimisticCompleted`) based on the `completed` status of the todo item. This state is used to reflect the change in the UI immediately.
	-   **Checkbox `onChange` Event**:
	    -   **Optimistic Update**: `setOptimisticCompleted` updates the UI immediately when the checkbox state changes.
	    -   **Server Request**: `toggleTodo` sends the actual state change to the server. If this fails, you might want to handle the error and revert the UI change accordingly.

By using `useOptimistic`, you provide a more immediate and responsive user experience without the need for `useTransition`, which is typically used to manage UI states during pending server requests.
### 2.4 useFormStatus & useFormState
1. **`useFormStatus`**
	- `useFormStatus` is a React hook specifically designed to track and manage the status of a form submission in Next.js. It is used to provide feedback to the user about the form's state, such as whether it's currently being submitted or if there was an error during submission. Importantly, `useFormStatus` must be used inside a component that is nested within the form it is meant to track.
	- **Key Points:**
		-   **Usage Context**: `useFormStatus` must be used inside a component that is part of the form. It tracks the form's submission status, allowing you to show loading indicators or disable form elements while the form is submitting.
		-   **Form Feedback**: This hook is useful for providing real-time feedback to the user, such as showing a spinner or a "Submitting..." message when the form is being submitted.
	- **Example of `useFormStatus`:**		
		```ts
		"use client"

		import { useFormStatus } from "react"

		function SubmitButton() {
		  const { pending } = useFormStatus()

		  return (
		    <button type="submit" disabled={pending}>
		      {pending ? "Submitting..." : "Submit"}
		    </button>
		  )
		}

		// Usage inside a form component
		export default function MyForm() {
		  return (
		    <form action="/api/submit" method="POST">
		      {/* Other form fields */}
		      <SubmitButton />
		    </form>
		  )
		}
		``` 

		-   **`pending`**: This boolean value indicates whether the form is currently being submitted. The button is disabled while `pending` is true, and the button text changes to reflect the submission status.

2. **`useFormState`**
	- `useFormState` is another React hook that helps manage the state of a form during a submission. It tracks changes in the form's state, which allows you to implement optimistic updates or handle state transitions more effectively. One of the key aspects of using `useFormState` is ensuring that you consider the `prevState` when performing server actions, to manage the form state appropriately and avoid unintended side effects.
	- **Key Points:**
		-   **State Management**: `useFormState` lets you handle the form's state as it changes, which is useful for implementing features like optimistic updates or reverting changes if a server request fails.
		-   **Server Action with `prevState`**: When using `useFormState` in a server action, you should consider the `prevState` to ensure the form state transitions smoothly. This helps in avoiding issues where the form might not reflect the actual state of the data, especially when dealing with asynchronous operations.
	- **Example of `useFormState`:**

```ts
"use client"

import { useFormState } from "react"
import { updateFormData } from "@/actions/form"

export function MyForm() {
  const [formState, setFormState] = useFormState({ name: "", email: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Optimistically update the form state
    const prevState = formState
    setFormState({ ...formState, submitting: true })

    try {
      // Perform the server action
      await updateFormData(formState)
    } catch (error) {
      // Revert to previous state if server action fails
      setFormState(prevState)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formState.name}
        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
      />
      <input
        type="email"
        value={formState.email}
        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
      />
      <button type="submit">Submit</button>
    </form>
  )
}
``` 

-   **Optimistic Updates**: `useFormState` is used to track the form's state, allowing for an optimistic update when the form is submitted.
-   **`prevState` Consideration**: If the server action fails, the form state is reverted to `prevState`, ensuring that the UI remains consistent with the actual data.

These hooks (`useFormStatus` and `useFormState`) are powerful tools in Next.js for managing form submissions, providing immediate feedback to users, and handling complex state transitions seamlessly.
