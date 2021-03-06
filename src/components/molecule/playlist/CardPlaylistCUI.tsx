import {
  Box,
  Flex,
  GridItem,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { playlistItem } from "../../../interface/utils";
import { useAppDispatch } from "../../../app/hooks";
import { requestItemPlaylistAction } from "../../../store/actions/playlistPageAction";

const CardPlaylistCUI = ({ data, event, onOpen }: playlistItem) => {
  const dispatch = useAppDispatch();
  const requestItem = () => {
    dispatch(requestItemPlaylistAction(data, event));
  };

  return (
    <GridItem w="100%" cursor={"pointer"}>
      <Flex
        p={5}
        mb={5}
        w={[300, 400]}
        className="cardlist"
        alignItems="center"
        justifyContent="center"
        data-bs-toggle="modal"
        data-bs-target="#modalplaylist"
        onClick={() => {
          onOpen();
          requestItem();
        }}
      >
        <Box
          bg={useColorModeValue("white", "gray.800")}
          w={["xs", "sm"]}
          h={["xs"]}
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative"
        >
          <Image
            h={["150px", "180px"]}
            w={"full"}
            src={
              data.images.length !== 0
                ? data.images[0].url
                : "http://placeimg.com/640/640/tech"
            }
            objectFit={"cover"}
          />

          <Box p="6" pb="1">
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Box
                fontSize="xl"
                fontWeight="semibold"
                as="h4"
                color={"white"}
                lineHeight="tight"
                _light={{ color: "black" }}
              >
                {data.name}
              </Box>
            </Flex>
          </Box>
          <Box p="6" pt="1">
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Box
                fontSize="xs"
                fontWeight="semibold"
                as="h4"
                color={"white"}
                _light={{ color: "black" }}
                lineHeight="tight"
                isTruncated
              >
                {data.description}
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </GridItem>
  );
};

export default CardPlaylistCUI;
