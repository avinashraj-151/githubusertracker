"use client"
import { Button, Center, Container, Text } from "@chakra-ui/react";
import Navbar from "./components/navbar";
import Search from "./components/Search";
import Userprofile from "./components/userprofile";
// import Repos from "./components/Repos"
import { useEffect, useState } from "react";
export default function Home() {
  const [userdata,setuserdata] =useState(null);
  const [loding,setloding] =useState(false);
  function fetchuserdata(result){
    // console.log(result);
    setuserdata(result);
  }
  // function printdata(print_data){
  //   let arraymai=Object.entries(print_data);
  //   let display=arraymai.map(function(key,value){
  //     return `${key}=${value}`.trimEnd();
  //   });
  //   return display;
  // }
  return (
    <Container maxW="container.lg">
      <Navbar></Navbar>
      <Text fontSize="2xl" textAlign={"center"} my={4}>
        search user on Github
      </Text>
      <Search setuserdata={fetchuserdata} setloding={setloding}></Search>
      {/* {userdata==null?"null":printdata(userdata)} */}
      {userdata && <Userprofile userData={userdata}></Userprofile>}
      {/* <Repos></Repos> */}
    </Container>
  );
}
