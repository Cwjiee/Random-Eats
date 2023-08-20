import { Heading, Spinner } from "@chakra-ui/react";
import { apiHandler } from "@/utils/apiHandler";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import randomise from "@/utils/randomise";

export default function RandomiseResult({ selectedUsers }) {
  const [userData, setUserData] = useState([]);
  const [restaurants, setRestaurants] = useState([{id: '', res: []}]);
  const [randomised, setRandomised] = useState('');


  useEffect(() => {
    (async () => {
      let arr = [];
      for (let i = 0; i < selectedUsers.length; i++) {
        const name = selectedUsers[i].name.toUpperCase();
        const data = await apiHandler.getUserChoicesByName(name);
        console.log(name)
        arr.push(data);
      }
      setUserData([...arr]);
    })();
  }, []);

  useEffect(() => {
    if(userData){
      (async () => {
        let arr = [];
        for (let i = 0; i < userData.length; i++) {
          for(let j=0; j<userData[i].restaurants.length; j++){
            const data = await apiHandler.getRestaurantFromId(userData[i].restaurants[j]);
            if (data.name !== undefined){
              console.log(data.name)
              const result = {id: i, res: data.name}
              arr.push(result);
              // userData[i].restaurants[j] = data.name;
            }
            setRestaurants([...arr]);
          }
        }
      })();
    }
  }, [userData]);

  useEffect(() => {
    let arr = []
    if(restaurants){
      for(let i=0; i<restaurants.length; i++){
        arr.push(restaurants[i].res)
      }
      const data = randomise(arr)
      setRandomised(data)
    }
  }, [restaurants]);

  return userData.length === 0 ? (
    <Spinner />
  ) : (
    <>
      <Heading>Results</Heading>
      {userData.map((user, index) => {
        
        return (
          <div key={v4()}>
            <Heading>{user.name}</Heading>
            {restaurants.map((res) => {
              if(res.id === index){
                return <div key={v4()}>{res.res}</div>
              }
            })
            }
          </div>
        );
      })}
      <Heading>Randomised</Heading>
      <div>{randomised}</div>
    </>
  );
}
