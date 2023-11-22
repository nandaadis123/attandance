// controller/deleteEmployee.js

const jwt = require("jsonwebtoken");
const { users } = require('../models');

async function deleteEmployee(req, res) {
  try {
    // Mendapatkan token dari header Authorization
    const token = req.headers.authorization.split(' ')[1]; // Dapatkan token setelah "Bearer "
    if (!token) {
      return res.status(401).json({ message: 'Token tidak ditemukan' });
    }
    // Verifikasi token
    const decodedToken = jwt.verify(token, process.env.SCRT_TKN);
    // Periksa apakah pengguna memiliki role "HR"
    if (decodedToken.role !== 'HR') {
      return res.status(403).json({ message: 'Anda tidak diizinkan menghapus data employee.' });
    }
    // Ambil ID employee yang akan dihapus dari parameter URL
    const employeeId = req.params.id;
    // Hapus data employee berdasarkan ID
    await users.destroy({
      where: {
        id: employeeId,
        role: 'employee', // Pastikan hanya role employee yang dapat dihapus
      },
    });
    return res.status(200).json({ message: 'Data employee berhasil dihapus.' });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = deleteEmployee;
