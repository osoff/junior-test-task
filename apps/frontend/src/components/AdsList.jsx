'use client';

import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';

import AdsListHead from './AdsListHead';
import AdCard from './AdCard';

function AdsList() {
  const [ad, setAd] = useState({});
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const contains = searchParams.get('contains');
  const city = searchParams.get('city');
  const district = searchParams.get('district');
  const paramsFilter = {
    minPrice,
    maxPrice,
    contains,
    city,
    district,
  };

  const params = Object.fromEntries(
    Object.entries(paramsFilter).filter(([value]) => !!value)
  );
  const fetchAds = useCallback(() => {
    const fetchData = async () => {
      try {
        setAd({});
        setLoading(true);
        const res = await axios.get(`/api/ads`, { params });
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
  }, [params]);
  return (
    <>
      <Box alignContent="center">
        <h1>And here it starts...</h1>
        <Button onClick={fetchAds} variant="outlined">
          Send an API request
        </Button>
      </Box>
      <Stack justifyContent="center" alignItems="center">
        <AdsListHead />
        {loading && <CircularProgress sx={{ mt: 10 }} />}
        <Box
          sx={{ maxWidth: 1200, gap: '20px' }}
          display="flex"
          justifyItems="center"
          justifyContent="center"
          mt={5}
          flexWrap="wrap"
        >
          {ad?.results?.map((ads) => (
            <AdCard key={ads.id} ad={ads} />
          ))}
          {ad.results?.length === 0 && <Typography>Не найдено</Typography>}
        </Box>
      </Stack>
      <ToastContainer />
    </>
  );
}

export default AdsList;
