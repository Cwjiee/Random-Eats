import { Heading } from '@chakra-ui/react'
import { apiHandler } from '@/utils/apiHandler'
import { useState, useEffect } from 'react'

export default function RandomiseResult({users}){
  const [userData, setUserData] = useState([]);

  useEffect(() => {
  },[])

  return ( 
    <>
      <Heading>Results</Heading>
      
    </>
  )
}