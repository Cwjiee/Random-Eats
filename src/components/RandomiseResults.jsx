import { Heading } from '@chakra-ui/react'
import { apiHandler } from '@/utils/apiHandler'
import { useState, useEffect } from 'react'

export default function RandomiseResult({selectedUsers}){
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    console.log(selectedUsers)
    (async() => {
      for(let user in selectedUsers){
        const name = user.toUpperCase();
        console.log(name)
        const data = await apiHandler.getUserChoicesByName(name);
        console.log(data)
        setUserData([...userData, data]);
        console.log(userData)
      }
    })();
  },[])

  return ( 
    <>
      <Heading>Results</Heading>
      
    </>
  )
}