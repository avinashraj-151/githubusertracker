"use client";
import { Button, Input,useToast} from "@chakra-ui/react";
import React, { useState } from "react";

function Search({setuserdata,setloding}) {
  let [query, setqyery] = useState("");
  const toast = useToast();
  async function handleSubmit(event){
    event.preventDefault();
    // alert(`you search for ${query}`);
    if(!query)return;
    setloding(true);
    setuserdata(null);
    try {
        //Inside this function, the await keyword is used to wait for the fetch function 
        //to complete its network request and get a response.
        const response= await fetch(`https://api.github.com/users/${query}`);
        // A Promise in JavaScript is an object representing the eventual 
        //completion or failure of an asynchronous operation, and its resulting value. 
        //It allows you to handle asynchronous tasks more easily 
        //by providing a way to work with asynchronous code in a more 
        //synchronous-like manner. Promises are widely used for tasks such as
        // fetching data from a server, reading files, or any other operation
        // that might take a significant amount of time to complete.
        const data=await response.json();
        if(data.message=='Not Found'){
            return toast({
                title: 'Error',
                description:'user not found',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
        setuserdata(data);
        addUserToLocalStorage(data, query);
    } catch (error) {
        toast({
            title: 'Error',
            description:error.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
    }finally{
        setloding(false);
    }
  }
  function changeinput(event){
    setqyery(event.target.value);
  }
  const addUserToLocalStorage = (data, username) => {
		const users = JSON.parse(localStorage.getItem("github-users")) || [];
		const userExists = users.find((user) => user.id === username);

		if (userExists) {
			users.splice(users.indexOf(userExists), 1);
		}
		users.unshift({
			id: username,
			avatar_url: data.avatar_url,
			name: data.name,
			url: data.html_url,
		});

		localStorage.setItem("github-users", JSON.stringify(users));
	};
  return (
    <form onSubmit={handleSubmit}>
      <Input
        variant={"outline"}
        placeholder={"Type a username(i.e,avinash_151)"}
        focusBorderColor="green.500"
        value={query}
        onChange={changeinput}
      ></Input>
      <Button type="submit" size={"md"} colorScheme="whatsapp" mt={5}
      disabled={!query} opacity={query ? 1 : 0.5}>
        Search
      </Button>
    </form>
  );
}

export default Search;
