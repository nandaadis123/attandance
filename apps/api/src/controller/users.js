const { users, sequelize } = require("../models");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');

module.exports = {
  getData: async (req, res, next) => {
    try {
      const result = await users.findAll();
      return res.status(200).send(result);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  },
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
  
      let result = await users.findOne({
        where: {
          username: username,
        },
        raw: true,
      });
  
      if (!result) {
        return res.status(401).send({
          success: false,
          message: "Username atau email tidak valid.",
        });
      }
  
      const isValid = await bcrypt.compare(password, result.password);


      if (isValid) {
        const { id, username, email, role } = result;
  
        const token = jwt.sign({ id, role }, process.env.SCRT_TKN);
  
        return res.status(200).send({
          success: true,
          result: {
            username,
            email,
            token,
            role,
          },
        });
      } else {
        return res.status(401).send({
          success: false,
          message: "Kata sandi salah.",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  keeplogin: async (req, res, next) => {
    try {
      // Mendapatkan token dari header Authorization
      const token = req.headers.authorization.split(' ')[1]; // Dapatkan token setelah "Bearer "

      if (!token) {
        return res.status(401).json({ message: 'Token tidak ditemukan' });
      }

      // Verifikasi token
      const decodedToken = jwt.verify(token, process.env.SCRT_TKN);

      // Sekarang, decodedToken berisi informasi yang ada di dalam token
      console.log(decodedToken);

      // Lakukan sesuatu dengan decodedToken, seperti mengambil ID pengguna
      const userId = decodedToken.id;

      // Kirim respon kembali ke frontend
      return res.status(200).json({ userId });
    } catch (error) {
      // Handle kesalahan verifikasi token
      return res.status(401).json({ message: 'Token tidak valid' });
    }
  },
  registerEmployee: async (req, res, next) => {
    try {
      const { username, password, email, } = req.body;

      // const role = localStorage.getItem('userRole');

      // // Validate user role (e.g., check if the user is an HR)
      // if (role !== 'HR') {
      //   return res.status(403).send({
      //     success: false,
      //     message: 'Anda tidak diizinkan melakukan registrasi. Hanya HR yang dapat mendaftarkan karyawan.',
      //   });
      // }

      // Check if username or email already exists
      const existingUser = await users.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
        raw: true,
      });

      if (existingUser) {
        return res.status(400).send({
          success: false,
          message: "Username atau email sudah terdaftar.",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await users.create({
        username,
        password: hashedPassword,
        email,
        role: 'employee',
      });

      const token = jwt.sign(
        { id: newUser.id, role: newUser.role },
        process.env.SCRT_TKN,
        { expiresIn: '1h' }
      );

      return res.status(201).send({
        success: true,
        result: {
          username: newUser.username,
          email: newUser.email,
          token,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send(error.message);
    }
  },
  getDataEmployee: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1]; // Dapatkan token setelah "Bearer "

      if (!token) {
        return res.status(401).json({ message: 'Token tidak ditemukan' });
      }

      // Verifikasi token
      const decodedToken = jwt.verify(token, process.env.SCRT_TKN);

      // Periksa apakah pengguna memiliki role "HR"
      if (decodedToken.role !== 'HR') {
        return res.status(403).json({ message: 'Anda tidak diizinkan mengakses data employee.' });
      }

      // Ambil data pengguna dengan role "employee"
      const employeeData = await users.findAll({
        where: {
          role: 'employee',
        },
        raw: true,
      });

      // Kirim respon kembali ke frontend
      return res.status(200).json({ employeeData });
    } catch (error) {
      // Handle kesalahan verifikasi token
      return res.status(401).json({ message: 'Token tidak valid' });
    }
  },


}