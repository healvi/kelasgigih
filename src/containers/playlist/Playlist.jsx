import {
  Box,
  Container, Grid, GridItem, Text, useDisclosure,
} from '@chakra-ui/react';
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardPlaylistCUI from '../../components/molecule/playlist/CardPlaylistCUI';
import ModalPlaylistCUI from '../../components/molecule/playlist/ModalPlaylistCUI';
import { setPlaylist } from '../../store/Playlist';
import { getPlaylistApi } from '../../utils/api/playlistApi';
import './Playlist.scss';

const Playlist = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = useSelector((state) => state.Auth.token);
  const datas = useSelector((state) => state.Playlist.playlist);
  const dispatch = useDispatch();
  const [modaldata, setModalData] = useState([]);

  const getPlaylist = async () => {
    try {
      const { data } = await getPlaylistApi();
      dispatch(setPlaylist(data.items));
    } catch (error) {
      console.log(error);
    }
  };
  const playlistCard = datas.length > 0 ? (
    datas.map((playlist) => (
      <GridItem w="100%" key={playlist.id}>
        <CardPlaylistCUI
          data={playlist}
          event={setModalData}
          token={token}
          onOpen={onOpen}
        />
      </GridItem>
    ))
  ) : (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Text fontSize="xl">Empty</Text>
    </Box>
  );
  useEffect(() => {
    getPlaylist();
  }, []);
  return (

    <div>
      <Container maxW="container.xl" bg="white.400" color="#262626" pt="3">
        <Text fontSize="4xl">Your Playlist</Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {playlistCard}
        </Grid>
      </Container>
      <ModalPlaylistCUI playlist={modaldata} event={setModalData} isOpen={isOpen} onClose={onClose} />
    </div>

  );
};

export default Playlist;