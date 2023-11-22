import { API_URL } from "../../helper";
import React, { useState } from 'react';
import axios from 'axios';
import SuccessModal from './succesModal';
import FailureModal from './failureModal';
import { Box,Input,Button,Text} from "@chakra-ui/react";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const [registrationStatus, setRegistrationStatus] = useState({
    success: null,
    message: '',
  });

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.email) {
      console.error('Username, password, and email harus terisi.');
      alert('Username, password, and email harus terisi.')
      return;
    }

   

    try {
      // Mendapatkan role dari local storage
      const role = localStorage.getItem('role'); 
      console.log('ini pengguna saat ini ' ,role);

      // Validasi role (contoh: hanya HR yang dapat mendaftarkan karyawan)
      if (role !== 'HR') {
        console.error('Anda tidak memiliki izin untuk melakukan registrasi.');
        return;
      }

      // Kirim permintaan registrasi ke backend
      const response = await axios.post(`${API_URL}/users/addEmployee`, formData); // Ganti 'API_URL' dengan URL backend Anda

      const { success, result, message } = response.data;

      if (success) {
        // Registrasi berhasil
        console.log('Registrasi berhasil:', result);
        setRegistrationStatus({ success, message });
        setIsSuccessModalOpen(true);
      } else {
        // Registrasi gagal
        console.error('Registrasi gagal:', message);
        setRegistrationStatus({ success, message });
        setIsFailureModalOpen(true);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle error (misalnya, tampilkan pesan kesalahan kepada pengguna)
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const closeFailureModal = () => {
    setIsFailureModalOpen(false);
  };

  return ( <Box>
    <Box>
      <Text>Registrasi Karyawan</Text>
      <Box onSubmit={handleRegister}>
        <Box>
          Username:
          <Input type="text" name="username" value={formData.username} onChange={handleInputChange} />
        </Box>
        <Box>
          Password:
          <Input type="password" name="password" value={formData.password} onChange={handleInputChange} />
        </Box>
        <Box>
          Email:
          <Input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        </Box>
        <Button type="submit">add employee</Button>
      </Box>
      <SuccessModal isOpen={isSuccessModalOpen} onRequestClose={closeSuccessModal} message={registrationStatus.message} />
      <FailureModal isOpen={isFailureModalOpen} onRequestClose={closeFailureModal} message={registrationStatus.message} />
    </Box>
    </Box>
  );
};

export default AddEmployee;
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { API_URL } from '../../helper';
// import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, Button ,Input} from '@chakra-ui/react';
// import {
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   MenuItemOption,
//   MenuGroup,
//   MenuOptionGroup,
//   MenuDivider,
// } from '@chakra-ui/react'



// function EmployeeData() {
//   const [employeeData, setEmployeeData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Mendapatkan token dari local storage
//     const token = localStorage.getItem('token');

//     // Menggunakan token untuk mengakses getDataEmployee di backend
//     fetch(`${API_URL}/users/getDataEmployee`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Gagal mengambil data employee');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setEmployeeData(data.employeeData);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       // Mendapatkan token dari local storage
//       const token = localStorage.getItem('token');

//       // Menggunakan token untuk mengakses endpoint deleteEmployee di backend
//       const response = await axios.delete(`${API_URL}/users/deleteEmployee/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // Menghapus data dari state setelah penghapusan berhasil
//       setEmployeeData((prevData) => prevData.filter((employee) => employee.id !== id));
//     } catch (error) {
//       console.error('Gagal menghapus data employee:', error.message);
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return ( <Box  height={'auto'}>

//     <Box marginBottom={5} marginRight={'0'}>
//     <Menu>
//   <MenuButton as={Button} colorScheme='pink'>
//     Profile
//   </MenuButton>
//     <MenuList>
//         <MenuGroup title='Profile'>
//         <MenuItem>My Account</MenuItem>
//         </MenuGroup>
//         <MenuDivider />
//         <MenuGroup title='Daftar isi'>
//         <MenuItem >Add Employee  </MenuItem>
//         <MenuItem>log-out</MenuItem>
//          </MenuGroup>
//      </MenuList>
//         </Menu>
//     </Box >




//        <Box height={'auto'}>
//     <Box border={'1px solid gray'} shadow={'dark-lg'} borderRadius={'10'} >
//       <Text fontSize={'24px'} margin={5}>Data Employee</Text>
//       <Table variant="striped" colorScheme="teal">
//         <Thead>
//           <Tr>
//             <Th>ID</Th>
//             <Th>Username</Th>
//             <Th>Email</Th>
//             <Th>Aksi</Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {employeeData.map((employee) => (
//             <Tr key={employee.id}>
//               <Td>{employee.id}</Td>
//               <Td>{employee.username}</Td>
//               <Td>{employee.email}</Td>
//               <Td>
//                 <Button colorScheme="blue" size="sm" mr={2}>
//                   Edit
//                 </Button>
//                 <Button colorScheme="red" size="sm" onClick={() => handleDelete(employee.id)}>
//                   Hapus
//                 </Button>
//               </Td>
//             </Tr>
//           ))}
//         </Tbody>
//       </Table>
//     </Box>
//     </Box>

    
  
    
//   </Box>
//   );
// }

// export default EmployeeData;