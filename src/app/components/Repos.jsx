"use client";
import React, { useEffect, useState } from "react";
import {
  useToast,
  Text,
  Flex,
  Spinner,
  Link,
  Badge,
  Button,
} from "@chakra-ui/react";
import { resolve } from "styled-jsx/css";
function Repos({ repourl }) {
  const toast = useToast();
  const [repo, setrepo] = useState([]);
  const [loading, setloading] = useState(false);
  const [showmore, setshowmore] = useState(false);
  // console.log(repo);
  useEffect(
    function () {
      const fetchrepourl = async () => {
        try {
          setloading(true);
          const response = await fetch(repourl);
          const data = await response.json();
          // console.log(data);
          if (data.message) throw new Error(data.message);
          setrepo(data);
        } catch (error) {
          toast({
            title: "Error",
            description: error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } finally {
          setloading(false);
        }
      };
      fetchrepourl();
    },
    [repourl, toast]
  );
  // console.log(...repo);
  function Captlizestring(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function Created_update(str) {
    let account_created = new Date(str).toDateString().split(" ");
    account_created = account_created.map(function (key, value) {
      if (value == 0) return;
      return `${key} `;
    });
    return account_created;
  }
  return (
    //in react when ever we want to fetch a data in react we use use effect
    <>
      <Text
        textAlign={"center"}
        letterSpacing={"wide"}
        fontSize={"3xl"}
        fontWeight={"bold"}
        color={"green.400"}
        mt={4}
      >
        REPOSITORIES
      </Text>
      {loading && (
        <Flex justifyContent={"center"}>
          <Spinner size={"xl"} my={4}></Spinner>
        </Flex>
      )}
      {repo
        .sort(function (a, b) {
          return b.stargazers_count - a.stargazers_count;
        })
        .map(function (repos, idx) {
          if (idx > 4 && !showmore) return null;
          return (
            <Flex
              key={repos.id}
              padding={4}
              bg={"whiteAlpha.200"}
              px={10}
              my={4}
              gap={4}
              borderRadius={4}
              justifyContent={"space-between"}
              alignItems={"center"}
              _hover={{ bg: "whiteAlpha.400" }}
              transition={"all 0.3 ease"}
            >
              <Flex flex={1} direction={"column"}>
                <Link
                  href={repos.html_url}
                  target="_blank"
                  fontSize={"md"}
                  fontWeight={"bold"}
                >
                  {Captlizestring(repos.name)}
                </Link>
                <Text fontSize={"md"}>
                  <Text
                    as={"span"}
                    mr={1}
                    color={"green.200"}
                    fontWeight={"bold"}
                  >
                    Created :
                  </Text>
                  {Created_update(repos.created_at)}
                  <Text
                    as={"span"}
                    mr={1}
                    color={"green.200"}
                    fontWeight={"bold"}
                    ml={2}
                  >
                    Updated :
                  </Text>
                  {Created_update(repos.updated_at)}
                </Text>
                <Badge
                  fontSize={"0.7em"}
                  w={"min-content"}
                  colorScheme="whatsapp"
                  gap={4}
                  textAlign={"center"}
                  px={1}
                  mt={1}
                >
                  Langauage : {repos.language || "none"}
                </Badge>
              </Flex>
              <Flex flex={1} ml={6} gap={4}>
                <Badge
                  fontSize={"0.7em"}
                  w={"min-content"}
                  colorScheme="orange"
                  gap={4}
                  textAlign={"center"}
                  flex={1}
                >
                  stars :{repos.stargazers_count || 0}
                </Badge>
                <Badge
                  fontSize={"0.7em"}
                  w={"min-content"}
                  colorScheme="pink"
                  gap={4}
                  textAlign={"center"}
                  flex={1}
                >
                  Forks : {repos.forks_count || 0}
                </Badge>
                <Badge
                  fontSize={"0.7em"}
                  w={"min-content"}
                  colorScheme="whatsapp"
                  gap={4}
                  textAlign={"center"}
                  flex={1}
                >
                  Watchers : {repos.watchers_count || 0}
                </Badge>
              </Flex>
            </Flex>
          );
        })}
      {showmore && (
        <Flex justifyContent={'center'}
        my={4}>
          <Button
            colorScheme={"whatsapp"}
            size={"md"}
            onClick={() => setshowmore(false)}
          >
            Show Less
          </Button>
        </Flex>
      )}
      {!showmore && repo.length > 5 && (
        <Flex  justifyContent={'center'}
        my={4}>
          <Button
            colorScheme={"whatsapp"}
            size={"md"}
            onClick={() => setshowmore(true)}
          >
            Show More
          </Button>
        </Flex>
      )}
    </>
  );
}

export default Repos;
