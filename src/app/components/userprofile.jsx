import {
  Avatar,
  Badge,
  Button,
  Flex,
  VStack,
  Text,
  Box,
} from "@chakra-ui/react";
import React from "react";
import Repos from "./Repos";
export default function userprofile({ userData }) {
//   if (userData != null) {
//     console.log(userData);
//   }
  let account_created=new Date(userData.created_at).toDateString().split(" ");
  account_created=account_created.map(function(key,value){
    if(value==0)return;
    return `${key} `;
  });
//   console.log(account_created);
  return (
    <>
    <Flex my={16} border={"2px solid"} borderColor={"green.500"} padding={5}>
      <VStack gap={5} padding={5}>
        <Avatar
          name={userData.name}
          src={userData == null ? "" : userData.avatar_url}
          size={"2xl"}
        />
        <Button colorScheme="whatsapp">
          <a href={userData.html_url} target="_blank">
            view profile
          </a>
        </Button>
      </VStack>
      <VStack mt={5} ml={8} alignItems={"flex-start"}>
        <Flex gap={4}>
          <Badge fontSize={"0.9em"} colorScheme="green">
            Public Repo : {userData.public_repos}
          </Badge>
          <Badge fontSize={"0.9em"} colorScheme="red">
            Public gists : {userData.public_gists}
          </Badge>
          <Badge fontSize={"0.9em"} colorScheme="purple">
            followers : {userData.followers}
          </Badge>
          <Badge fontSize={"0.9em"} colorScheme="orange">
            following: {userData.following}
          </Badge>
        </Flex>
        <Text fontSize={"2xl"} fontWeight={"bold"} mt={4} color={"green.400"}>
          {userData.name}
        </Text>
        <Text fontSize={"md"} fontWeight={"bold"} color={"green.500"}>
          {userData.bio}
        </Text>
        <Box>
          <Text fontSize={"md"}>
            <Text as={"span"} mr={1} color={"green.200"} fontWeight={"bold"}>
              company:{" "}
            </Text>
            {userData.company || "Not specified"}
          </Text>
          <Text fontSize={"md"}>
            <Text as={"span"} mr={1} color={"green.200"} fontWeight={"bold"}>
              location:{" "}
            </Text>
            {userData.location || "Not specified"}
          </Text>
          <Text fontSize={"md"}>
            <Text as={"span"} mr={1} color={"green.200"} fontWeight={"bold"}>
              Blog/website :{" "}
            </Text>
            {userData.blog?<a href={userData.blog} target="_blank">{userData.blog}</a> :"Not specified"}
          </Text>
          <Text fontSize={"md"}>
            <Text as={"span"} mr={1} color={"green.200"} fontWeight={"bold"}>
              Member Since :
            </Text>
            {account_created}
          </Text>
        </Box>
      </VStack>
    </Flex>
    <Repos repourl={userData.repos_url}></Repos>
    </>
  );
}
