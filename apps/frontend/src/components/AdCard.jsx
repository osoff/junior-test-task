'use client';

import { Divider, Stack, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';

function AdCard({ ad }) {
  const [storageLike] = useState(
    localStorage.getItem('fav') ? JSON.parse(localStorage.getItem('fav')) : []
  );

  const [liked, setLiked] = useState(storageLike.some((el) => el === ad.id));
  let city = ad.city_name?.slice(1, 15);
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

  return (
    <Stack
      width={250}
      sx={{
        border: '1px solid grey',
        cursor: 'pointer',
      }}
    >
      <Link href={`./ads/${ad.id}`}>
        <Image src={ad?.images[0].image} alt="adIm" width={250} height={200} />
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
          <Typography>{city || 'Not specified'}</Typography>
          <Typography>{ad.price}</Typography>
        </Stack>
      </Link>
    </Stack>
  );
}

export default AdCard;
