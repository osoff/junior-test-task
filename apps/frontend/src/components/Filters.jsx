import React, { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

function Filters({ open, setOpen }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') ?? 0);
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') ?? 0);
  const [city, setCity] = useState(searchParams.get('city') ?? '');
  const [district, setDistrict] = useState(searchParams.get('district') ?? '');
  const [contains, setContains] = useState(searchParams.get('contains') ?? '');

  function setParams() {
    router.replace(
      `/?minPrice=${minPrice.toString()}&maxPrice=${maxPrice.toString()}&city=${city.toString()}&district=${district.toString()}&contains=${contains.toString()}`
    );
    setOpen(false);
  }
  function onCancel() {
    setOpen(false);
    setMinPrice(searchParams.get('minPrice') ?? 0);
    setMaxPrice(searchParams.get('maxPrice') ?? 0);
    setCity(searchParams.get('city') ?? '');
    setDistrict(searchParams.get('district') ?? '');
    setContains(searchParams.get('contains') ?? '');
  }
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Filters</DialogTitle>
      <DialogContent sx={{ width: 400 }}>
        <Stack spacing={2}>
          <TextField
            label="Min price"
            variant="standard"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              //   router.push(`/?${createQueryString('minPrice', e.target.value)}`);
            }}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Max price"
            variant="standard"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              //   router.push(`/?${createQueryString('maxPrice', e.target.value)}`);
            }}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="City"
            variant="standard"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              //   router.push(`/?${createQueryString('city', e.target.value)}`);
            }}
          />
          <TextField
            label="District"
            variant="standard"
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value);
              //   router.push(`/?${createQueryString('district', e.target.value)}`);
            }}
          />
          <TextField
            label="Contains"
            variant="standard"
            value={contains}
            onChange={(e) => {
              setContains(e.target.value);
              //   router.push(`/?${createQueryString('contains', e.target.value)}`);
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onCancel();
          }}
        >
          Cancel
        </Button>
        <Button onClick={() => setParams()}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Filters;

// import React, { useCallback, useState } from 'react';

// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Stack,
//   TextField,
// } from '@mui/material';
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import { createUrl } from '../app/createUrl';

// function Filters({ open, setOpen }) {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') ?? 0);
//   const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') ?? 0);
//   const [city, setCity] = useState(searchParams.get('city') ?? '');
//   const [district, setDistrict] = useState(searchParams.get('district') ?? '');
//   const [contains, setContains] = useState(searchParams.get('contains') ?? '');

//   const createQueryString = useCallback(
//     (name, value) => {
//       const params = new URLSearchParams(searchParams);
//       params.set(name, value);
//       return params.toString();
//     },
//     [searchParams]
//   );

//   function setParams() {
//     router.push(`/?${createQueryString('minPrice', minPrice.toString())}`);
//     router.push(`/?${createQueryString('maxPrice', maxPrice.toString())}`);
//     router.push(`/?${createQueryString('city', city.toString())}`);
//     router.push(`/?${createQueryString('district', district.toString())}`);
//     router.push(`/?${createQueryString('contains', contains.toString())}`);
//   }
//   return (
//     <Dialog open={open} onClose={() => setOpen(false)}>
//       <DialogTitle>Filters</DialogTitle>
//       <DialogContent sx={{ width: 400 }}>
//         <Stack spacing={2}>
//           <TextField
//             label="Min price"
//             variant="standard"
//             value={minPrice}
//             onChange={(e) => {
//               setMinPrice(e.target.value);
//               router.push(`/?${createQueryString('minPrice', e.target.value)}`);
//             }}
//             type="number"
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <TextField
//             label="Max price"
//             variant="standard"
//             value={maxPrice}
//             onChange={(e) => {
//               setMaxPrice(e.target.value);
//               router.push(`/?${createQueryString('maxPrice', e.target.value)}`);
//             }}
//             type="number"
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <TextField
//             label="City"
//             variant="standard"
//             value={city}
//             onChange={(e) => {
//               setCity(e.target.value);
//               router.push(`/?${createQueryString('city', e.target.value)}`);
//             }}
//           />
//           <TextField
//             label="District"
//             variant="standard"
//             value={district}
//             onChange={(e) => {
//               setDistrict(e.target.value);
//               router.push(`/?${createQueryString('district', e.target.value)}`);
//             }}
//           />
//           <TextField
//             label="Contains"
//             variant="standard"
//             value={contains}
//             onChange={(e) => {
//               setContains(e.target.value);
//               router.push(`/?${createQueryString('contains', e.target.value)}`);
//             }}
//           />
//         </Stack>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => setOpen(false)}>Cancel</Button>
//         <Button onClick={() => setParams()}>Save</Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// export default Filters;
