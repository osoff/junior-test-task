'use client';

import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FullPage from './FullPage';

function AdDetails() {
  const { id } = useParams();
  const [ad, setAd] = useState(undefined);
  const [imgId, setImgId] = useState(0);
  const [isLoad, setLoading] = useState(false);
  const [storageLike] = useState(
    localStorage.getItem('fav') ? JSON.parse(localStorage.getItem('fav')) : []
  );
  const [liked, setLiked] = useState(
    storageLike.some((el) => el === Number(id))
  );
  let city = ad?.city_name?.slice(1, 15);
  if (city?.length >= 15) {
    city += '...';
  }
  const toggleLike = (e) => {
    e.preventDefault();
    const favMas = JSON.parse(localStorage.getItem('fav')) || [];

    if (!liked) {
      favMas.push(ad.id);
      localStorage.setItem('fav', JSON.stringify(favMas));
    } else {
      const index = favMas.indexOf(ad.id);
      if (index !== -1) {
        favMas.splice(index, 1);
        localStorage.setItem('fav', JSON.stringify(favMas));
      }
    }
    setLiked((like) => !like);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setAd({});
        setLoading(true);
        const res = await axios.get(`/api/ads/${id}`);
        if (res.status !== 200) {
          setLoading(false);
          toast.error('Failed fetch data!', {
            position: 'top-center',
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          throw new Error('failed fetch');
        }
        const { data } = res;
        setAd(data);
        setLoading(false);
      } catch (e) {
        toast.error('Oops...Failed fetch data!', {
          position: 'top-center',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  if (isLoad) {
    return (
      <FullPage>
        <CircularProgress />
      </FullPage>
    );
  }
  if (ad) {
    return (
      <Stack justifyContent="center" alignItems="center" padding="40px">
        <Box
          width={400}
          sx={{ border: '1px solid grey', borderRadius: '20px' }}
          p={2}
        >
          <Stack direction="row" alignItems="center" gap={2}>
            <div>
              <IconButton
                onClick={() => setImgId((_id) => _id - 1)}
                disabled={imgId === 0}
              >
                <KeyboardArrowLeftIcon />
              </IconButton>
            </div>
            <Image
              src={ad?.images?.[imgId].image}
              width={250}
              alt="ads"
              height={300}
              style={{ borderRadius: '20px' }}
            />
            <div>
              <IconButton
                onClick={() => setImgId((_id) => _id + 1)}
                // eslint-disable-next-line no-unsafe-optional-chaining
                disabled={imgId === ad?.images?.length - 1}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            </div>
          </Stack>

          <Stack direction="row" justifyContent="space-between" mt="40px">
            <Typography maxWidth="75%">{ad.title}</Typography>
            {!liked ? (
              <FavoriteBorderIcon
                sx={{ cursor: 'pointer' }}
                onClick={toggleLike}
              />
            ) : (
              <FavoriteIcon
                sx={{ color: 'red', cursor: 'pointer' }}
                onClick={toggleLike}
              />
            )}
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="space-between" mt="8px">
            <Stack direction="row" gap={2}>
              <Typography>{city || 'Not specified'}</Typography>
              <Typography>{ad.district_name || 'Not specified'}</Typography>
            </Stack>
            <Typography>{ad.price}</Typography>
          </Stack>
          <Typography mt={4}>{ad.description}</Typography>
        </Box>
      </Stack>
    );
  }
}

export default AdDetails;
