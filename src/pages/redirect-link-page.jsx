import React from 'react';

import {storeClicks} from "@/db/apiClicks";
import {getLongUrl} from "@/db/apiUrl";
import useFetch from "@/hooks/use-fetch";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {BarLoader} from "react-spinners";

const RedirectLinkPage = () => {


  // Extract the URL ID from the route parameters using React Router's `useParams` hook
  const {id} = useParams();

  // Custom hook to fetch the original URL based on the URL ID
  const {loading, data, fn} = useFetch(getLongUrl, id);

  // Custom hook to store click statistics for the current URL
  const {loading: loadingStats, fn: fnStats} = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  // Trigger the function to fetch the original URL when the component mounts
  useEffect(() => {
    fn(); // Fetch the original URL details
  }, []);

  // Trigger the function to store click stats once the original URL data is fetched
  useEffect(() => {
    if (!loading && data) {
      fnStats(); // Record the click details
    }
  }, [loading]);

  // Display a loading indicator while fetching the URL or recording stats
  if (loading || loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting...
      </>
    );
  }

  // Render nothing after the redirection process is complete
  return null;
}

export default RedirectLinkPage;