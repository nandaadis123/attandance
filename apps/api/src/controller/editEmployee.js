// controller/editEmployee.js

const jwt = require("jsonwebtoken");
const { users } = require('../models');

async function editEmployee(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token tidak ditemukan' });
    }

    const decodedToken = jwt.verify(token, process.env.SCRT_TKN);

    const employeeId = req.params.id;

    // Pastikan hanya role "HR" atau pemilik akun yang dapat mengedit data employee
    if (decodedToken.role !== 'HR' && decodedToken.id !== employeeId) {
      return res.status(403).json({ message: 'Anda tidak diizinkan mengedit data employee.' });
    }

    // Ambil data employee berdasarkan ID
    const employee = await users.findByPk(employeeId);

    if (!employee) {
      return res.status(404).json({ message: 'Data employee tidak ditemukan.' });
    }

    // Update data employee berdasarkan perubahan yang diinginkan
    await employee.update(req.body);

    return res.status(200).json({ message: 'Data employee berhasil diubah.' });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = editEmployee;
