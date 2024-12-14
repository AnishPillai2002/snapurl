
// Import necessary functions and hooks from React
import { createContext, useContext, useEffect } from "react";
// Import an API function to fetch the current user
import { getCurrentUser } from "./db/apiAuth";
// Import a custom hook for handling API requests
import useFetch from "./hooks/use-fetch";

// Create a Context for sharing user-related data across components
const UrlContext = createContext();

// Define the provider component to manage and provide context values
const UrlProvider = ({ children }) => {
  // Use the custom hook to fetch the current user
  // 'data' will hold the user details, 'loading' indicates the fetch status, and 'fn' is the fetch function
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUser);

  // Determine if the user is authenticated based on their role
  const isAuthenticated = user?.role === "authenticated";

  // Use an effect to fetch user data when the component mounts
  useEffect(() => {
    fetchUser(); // Fetch the current user details
  }, []); // Empty dependency array ensures this runs only on mount

  // Provide context values (user data, loading state, authentication status, and fetch function) to children
  return (
    <UrlContext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>
      {children}
    </UrlContext.Provider>
  );
};

// Define a custom hook for accessing the UrlContext values
export const UrlState = () => {
  // useContext allows components to access the values from UrlContext
  return useContext(UrlContext);
};

// Export the UrlProvider as the default export for use in the app
export default UrlProvider;
