import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button';
import { Copy,Download,Trash } from 'lucide-react';

const LinkCard = ({url,fetchUrl}) => {

    //function to download image by simulating anchor tag
    const downloadImage = () => {
        const imageUrl = url?.qr;
        const fileName = url?.title; // Desired file name for the downloaded image
    
        // Create an anchor element
        const anchor = document.createElement("a");
        anchor.href = imageUrl;
        anchor.download = fileName;
    
        // Append the anchor to the body
        document.body.appendChild(anchor);
    
        // Trigger the download by simulating a click event
        anchor.click();
    
        // Remove the anchor from the document
        document.body.removeChild(anchor);
    };


  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
        <img src={url?.qr} 
            className="h-32 object-contain ring ring-blue-500 self-start" 
            alt="qr code" 
        />

        <Link to={`/link/${url?.id}`} className='flex flex-col gap-1'>
            <span  className="text-3xl font-extrabold hover:underline cursor-pointer">{url?.title}</span>

            <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer">
                https://snapurl.in/{url?.custom_url ? url?.custom_url : url?.short_url}
            </span>

            <span className="flex items-center gap-1 hover:underline cursor-pointer">
                {url?.original_url}
            </span>

            <span className="flex items-end font-extralight text-sm flex-1">
                {new Date(url?.created_at).toLocaleString()}
            </span>
        </Link>

        <div className="flex gap-2">
        <Button
          variant="ghost"
          onClick={() =>
            navigator.clipboard.writeText(`https://snapurl.in/${url?.short_url}`)
          }
        >
          <Copy />
        </Button>

        <Button variant="ghost" onClick={downloadImage}>
          <Download />
        </Button>

        <Button
          variant="ghost"
          onClick={() => {}}
        >
          <Trash />
        </Button>

   
      </div>

    </div>
  )
}

export default LinkCard