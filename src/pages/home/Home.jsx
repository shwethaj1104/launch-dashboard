import React, { useState } from 'react'

import { useEffect } from 'react';

const url = 'https://api.spacexdata.com/v3/launches'



const Home = () => {
    const [loading, setLoading] = useState(true);
    const [launches, setLaunches] = useState([])
    const [value, setValue] = useState(0);
    const fetchJobs = async () => {
      const response = await fetch(url);
      const newresponse = await response.json();
      console.log("newJobs",newresponse)
      setLaunches(newresponse)
    }
  
    useEffect(() => {
      fetchJobs()
    }, [])
  return (
    <div>Home</div>
  )
}

export default Home