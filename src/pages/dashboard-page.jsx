import React, { useEffect, useState } from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {BarLoader} from 'react-spinners'

import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import { Filter } from 'lucide-react'
import useFetch from '@/hooks/use-fetch'
import { getUrls } from '@/db/apiUrl'
import { UrlState } from '@/context'
import { getClicksForUrls } from '@/db/apiClicks'
import Error from '@/components/error'
import LinkCard from '@/components/link-card'

const DashboardPage = () => {

  const [searchQuery,setSearchQuery] = useState("");
  
  const {user} = UrlState();

  const {loading, error, data:urls,fn:fnUrls} = useFetch(getUrls,user?.id);

  const {loading:loadingClicks, error:loadingError, data:clicks,fn:fnClicks} = useFetch(getClicksForUrls,urls?.map((url)=>url.id));


  useEffect(()=>{
    fnUrls();
  },[]);

  useEffect(()=>{
    if(urls?.length){
      fnClicks();
    }    
  },[urls?.length]);

  //filtered urls
  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='flex flex-col gap-8'>
      {(loading || loadingClicks) && <BarLoader className='mb-4' width={"100%"} color='#009990'/>}
      
      <div className='grid grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className='flex justify-between'>
        <h1 className='font-extrabold text-4xl'>
          My Links
        </h1>
        <Button>
          Create Link
        </Button>
      </div>

      <div className='relative'>
        <Input
          type="text"
          placeholder="Filter Links . . ."
          value={searchQuery}
          onChange={e=>setSearchQuery(e.target.value)}
        />

        <Filter className='absolute top-2 right-2 p-1'/>
      </div>
      
      {error && <Error message={error?.message}/>}

      {
        (filteredUrls || []).map((url,i)=>{
          return <LinkCard key={i} url={url} fetchUrl={fnUrls}/>
        })
      }
    </div>
  )
}

export default DashboardPage