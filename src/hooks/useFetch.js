import { useState, useEffect } from "react";

export const useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null); // Stores the fetched data.
  const [isPending, setIsPending] = useState(false); // Indicates whether a fetch request is in progress.
  const [error, setError] = useState(null); // Stores any error messages from failed fetch requests.
  const [options, setOptions] = useState(null); // Stores fetch options for POST requests (e.g., headers, body).

  // This function is for making POST requests, postData is a parameter that is passed in which is an object that contains the data to be sent to the server.
  const postData = (postData) => {
    // It sets the options state to include the method (POST), headers (Content-Type is set to application/json), and the body (data to be sent, which is converted to JSON format using JSON.stringify).
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData), // turns the js object into JSON
    });
  };

  useEffect(() => {
    const controller = new AbortController(); // a new AbortController instance (controller) is created. This is useful for aborting the fetch request if the component unmounts (cleanup).

    // In the fetchData function, the fetchOptions parameter represents an object containing additional options for the fetch request. These options can include details like the HTTP method (GET, POST, etc.), headers, body (for POST or PUT requests), and other configurations.
    const fetchData = async (fetchOptions) => {
      setIsPending(true); // When the request starts, isPending is set to true to show that the data is being fetched.

      try {
        const res = await fetch(
          url, // The API endpoint or server you're trying to contact.
          {
            ...fetchOptions, // ...fetchOptions contains the method, headers, and body to customize the request.
            signal: controller.signal, // signal allows you to cancel the request if needed, using an AbortController.
          }
        );

        // If the response is OK (status code 200-299), it converts the response to JSON and updates data with it.If the response is not OK, it throws an error, which is caught in the catch block.

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const data = await res.json();
        setIsPending(false);
        setData(data);
        setError(null);

      } catch (err) {
        // This checks if the error is an "AbortError". This specific error occurs when a fetch request is canceled or aborted using the AbortController
        if (err.name === "AbortError") {
          console.log("the fetch was aborted");
        } else {
          // If the error is not an "AbortError", this means the fetch failed due to some other reason (e.g., network issues, invalid URL, or a server error).
          setIsPending(false);
          setError("Could not fetch the data");
        }
      }
    };

    // invoke the function
    if (method === "GET") {
      fetchData();
    }
    if (method === "POST" && options) {
      fetchData(options);
    }

    return () => {
      controller.abort();
    };

  }, [url, method, options]);

  return { data, isPending, error, postData };
};
