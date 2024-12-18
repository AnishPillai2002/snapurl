import { UrlState } from '@/context'
import React from 'react'
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import {useEffect, useRef, useState} from "react";
import {createUrl} from "@/db/apiUrl";

import useFetch from "@/hooks/use-fetch";
import Error from "./error";
import * as yup from "yup";

import {BeatLoader} from "react-spinners";
import { Button} from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
  } from "@/components/ui/dialog"
import { QRCode } from 'react-qrcode-logo';
  

const CreateLink = () => {
    
    const {user} = UrlState(); // Context to access the current user state.
    const navigate = useNavigate(); // Hook for navigation.
    
    // Hook for managing URL search parameters.
    let[searchParams,setSearchParams] = useSearchParams();

    // Extract the `createNew` parameter from the URL to preset the `longUrl` field.
    const longLink=searchParams.get("createNew");

    // State to manage validation errors.
    const [errors, setErrors] = useState({});

    const ref=useRef();

    // State to store form input values.
    const [formValues, setFormValues] = useState({
        title: "",
        longUrl: longLink ? longLink : "", //preset longUrl from url parameter
        customUrl: "",
    });

    // Yup schema for form validation.
    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        longUrl: yup
        .string()
        .url("Must be a valid URL")
        .required("Long URL is required"),
        customUrl: yup.string(),
    });

    //Updates the form values when a user types in an input field.
    const handleChange = (e) => {
        setFormValues({
          ...formValues,
          [e.target.id]: e.target.value,
        });
    };


    const {
        loading,
        error,
        data,
        fn: fnCreateUrl,
    } = useFetch(createUrl, {...formValues, user_id: user.id});
    
  
    //function to create new link on click
    const createNewLink = async() => {

        // Reset errors state before validation
        setErrors([]);


        try {
            // Validate form values using the defined schema
            // `abortEarly: false` ensures all validation errors are collected
            await schema.validate(formValues, {abortEarly: false});

            // Access the canvas element using the ref to capture its current state
            const canvas = ref.current.canvasRef.current;

            // Convert the canvas content to a Blob object asynchronously
            const blob = await new Promise((resolve) => canvas.toBlob(resolve));

             // Trigger the function to create the URL, passing the generated Blob
            await fnCreateUrl(blob);
        } catch (e) {

            // If validation fails or an error occurs, process the errors
            const newErrors = {};

            // Iterate over validation errors (if any) and format them into an object
            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });

             // Update the errors state to display validation messages to the user
            setErrors(newErrors);
        }
    }

    // Redirects the user to the link details page if there is no error and valid data is available.
    useEffect(() => {
        if (error === null && data) {
          navigate(`/link/${data[0].id}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, data]);

    return (
    <Dialog 
        defaultOpen={longLink}
        onOpenChange={(res)=>{
            if(!res){
                setSearchParams({});
            }
        }}
    >
        <DialogTrigger>
            <Button variant="destructive">Create New Link</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle className="font-bold text-2xl">Create Link</DialogTitle>
            </DialogHeader>

            {formValues?.longUrl && <QRCode value={formValues?.longUrl} size={250} ref={ref}/>}

            <Input
            id="title"
            placeholder="Short Link's Title"
            value={formValues.title}
            onChange={handleChange}
            />
            {errors.title && <Error message={errors.title} />}
            <Input
            id="longUrl"
            placeholder="Enter your Loooong URL"
            value={formValues.longUrl}
            onChange={handleChange}
            />
            {errors.longUrl && <Error message={errors.longUrl} />}
            <div className="flex items-center gap-2">
                <Card className="p-2">snapurl.in</Card> /
                <Input
                    id="customUrl"
                    placeholder="Custom Link (optional)"
                    value={formValues.customUrl}
                    onChange={handleChange}
                />
            </div>
            {error && <Error message={errors.message} />}
            <DialogFooter className="sm:justify-start">
                <Button
                    type="button"
                    variant="destructive"
                    disabled={loading}
                    onClick={createNewLink}
                >
                    {loading ? <BeatLoader size={10} color="white" /> : "Create"}
                </Button>
                </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default CreateLink