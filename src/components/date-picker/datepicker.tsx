// 'use client';

// import * as React from 'react';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// export default function DatePickers() {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DatePicker']}>
//         <DatePicker
//           label="Basic date picker"
//           slotProps={{
//             textField: {
//               sx: {
//                 '& .MuiInputBase-root': {
//                   fontSize: '0.8rem', // Ukuran font lebih kecil
//                   height: '40px', // Tinggi input
//                   padding: '0 8px', // Padding internal
//                   display: 'flex',
//                   alignItems: 'center', // Pastikan teks tetap sejajar
//                   borderRadius: '20px', // Fully rounded border
//                   border: '1px solid #ccc', // Border dengan warna abu-abu
//                   overflow: 'hidden', // Hilangkan overflow
//                 },
//                 '& .MuiInputLabel-root': {
//                   fontSize: '0.75rem', // Ukuran label lebih kecil
//                 },
//                 width: '200px', // Lebar DatePicker
//               },
//             },
//           }}
//           sx={{
//             '& .MuiPaper-root': {
//               overflow: 'hidden', // Hilangkan scrollbar pada menu
//               borderRadius: '20px', // Fully rounded dropdown menu
//             },
//           }}
//         />
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }
