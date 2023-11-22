
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { API_URL } from '../../helper';
// import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Input } from '@chakra-ui/react';
// import {
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   MenuItemOption,
//   MenuGroup,
//   MenuOptionGroup,
//   MenuDivider,
// } from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';

// function EmployeeData() {
//   const navigate = useNavigate();
//   const [employeeData, setEmployeeData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     email: '',
//   });

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     navigate('/')
//   };



//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleAddEmployee = async () => {
//     try {
//       const token = localStorage.getItem('token');

//       const response = await axios.post(`${API_URL}/users/addEmployee`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const { success, result, message } = response.data;

//       if (success) {
       
//         setEmployeeData([...employeeData, result]);
//         alert('data employee berhasil ditambahkan')
//         onClose();
//       } else {
//         console.error('gagal menambahkan data employee:', message);
//       }
//     } catch (error) {
//       console.error('Error adding employee:', error.message);
//     }
//   };


//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     fetch(`${API_URL}/users/getDataEmployee`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch employee data');
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
//       const token = localStorage.getItem('token');

//       const response = await axios.delete(`${API_URL}/users/deleteEmployee/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setEmployeeData((prevData) => prevData.filter((employee) => employee.id !== id));
//       alert('data berhasil dihapus');
//     } catch (error) {
//       console.error('gagal menghapus data employee:', error.message);
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <Box height={'auto'}>
//       <Box border={'1px solid gray'} shadow={'dark-lg'} borderRadius={'10'}>
//         <Text fontSize={'24px'} margin={5}>Data Employee</Text>
//         <Button colorScheme="teal" onClick={onOpen}>
//           Add Employee
//         </Button>
//         <Button colorScheme="orange" onClick={handleLogout} ml={2}>
//           Logout
//         </Button>
//         <Table variant="striped" colorScheme="teal">
//           <Thead>
//             <Tr>
//               <Th>ID</Th>
//               <Th>Username</Th>
//               <Th>Email</Th>
//               <Th>Action</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {employeeData.map((employee) => (
//               <Tr key={employee.id}>
//                 <Td>{employee.id}</Td>
//                 <Td>{employee.username}</Td>
//                 <Td>{employee.email}</Td>
//                 <Td>
//                   <Button colorScheme="blue" size="sm" mr={2}>
//                     Edit
//                   </Button>
//                   <Button colorScheme="red" size="sm" onClick={() => handleDelete(employee.id)}>
//                     Delete
//                   </Button>
//                 </Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       </Box>

//       {/* Add Employee Modal */}
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Add Employee</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} />
//             <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
//             <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="teal" onClick={handleAddEmployee}>
//               Add Employee
//             </Button>
//             <Button onClick={onClose}>Cancel</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// }

// export default EmployeeData;






import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../helper';
import { Box, Text, Table, Thead, Tbody,Tr, Th, Td, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input } from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';


function EmployeeData() {
  const navigate = useNavigate();
  const { isOpen: isAddModalOpen, onOpen: onAddModalOpen, onClose: onAddModalClose } = useDisclosure();
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    id:null,
    username: '',
    password: '',
    email: '',
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/')
  };



  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!formData.username || !formData.email || !formData.password) {
        alert('Username, email, dan password wajib di isi.');
        return;
      }

      const response = await axios.post(`${API_URL}/users/addEmployee`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { success, result, message } = response.data;

      if (success) {
       
        setEmployeeData([...employeeData, result]);
        alert('data employee berhasil ditambahkan')
        onClose();
      } else {
        console.error('gagal menambahkan data employee:', message);
      }
    } catch (error) {
      console.error('Error adding employee:', error.message);
    }
  };

  const handleEditEmployee = async () => {
    try {
      const token = localStorage.getItem('token');
      const id = formData.id;

      if (!formData.username || !formData.email || !formData.password) {
        alert('Username, email, dan password wajib di isi.');
        return;
      }
  
      const response = await axios.put(
        `${API_URL}/users/editEmployee/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // tambahkan header ini
          },
        }
      );
      console.log('Full Response:', response);
  
      const { success, message } = response.data;

      console.log(response.data);
      
  
      if (response.status === 200) {
        // Update data employee di state setelah berhasil edit
         const updatedEmployeeData = employeeData.map((employee) =>
           employee.id === formData.id ? { ...employee, ...formData } : employee
        );
  
        setEmployeeData(updatedEmployeeData);
        alert('Data employee berhasil diubah');
        onEditModalClose();
      } else {
        console.error('Gagal mengedit data employee:', message);
        alert('Gagal mengedit data employee: ' + message);
      }
    } catch (error) {
      console.error('Error editing employee:', error.message);
    }
  };
  
  


  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`${API_URL}/users/getDataEmployee`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch employee data');
        }
        return response.json();
      })
      .then((data) => {
        setEmployeeData(data.employeeData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.delete(`${API_URL}/users/deleteEmployee/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployeeData((prevData) => prevData.filter((employee) => employee.id !== id));
      alert('data berhasil dihapus');
    } catch (error) {
      console.error('gagal menghapus data employee:', error.message);
    }
  };

  const handleEditModalOpen = (employee) => {
    // Menyiapkan data employee yang akan diedit saat membuka modal edit
    setFormData({
      id: employee.id,
      username: employee.username,
      password: '', // Jangan menampilkan password yang ada, sesuai kebijakan keamanan
      email: employee.email,
    });
    onEditModalOpen();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Box height={'auto'}>
      <Box border={'1px solid gray'} shadow={'dark-lg'} borderRadius={'10'}>
        <Text fontSize={'24px'} margin={5}>Data Employee</Text>
        <Button colorScheme="teal" onClick={onOpen}>
          Add Employee
        </Button>
        <Button colorScheme="orange" onClick={handleLogout} ml={2}>
          Logout
        </Button>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              {/* <Th>ID</Th> */}
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {employeeData.map((employee) => (
              <Tr key={employee.id}>
                {/* <Td>{employee.id}</Td> */}
                <Td>{employee.username}</Td>
                <Td>{employee.email}</Td>
                <Td>
                <Button colorScheme="blue" size="sm" mr={2} onClick={() => handleEditModalOpen(employee)}>
                    Edit
                  </Button>
                  <Button colorScheme="red" size="sm" onClick={() => handleDelete(employee.id)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Add Employee Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input marginBottom={2} type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} />
            <Input marginBottom={2} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
            <Input marginBottom={2} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleAddEmployee}>
              Add Employee
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Edit Employee Modal */}
      <Modal isOpen={isEditModalOpen} onClose={onEditModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input marginBottom={2} type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} />
            <Input marginBottom={2} type="password" name="password" placeholder="New Password" value={formData.password} onChange={handleInputChange} />
            <Input marginBottom={2} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleEditEmployee}>
              Save Changes
            </Button>
            <Button onClick={onEditModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default EmployeeData;