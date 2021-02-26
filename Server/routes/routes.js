const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');

module.exports = router;

//Register route

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    //1. destructure the req.body (firstName, LastName....)
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email,
    ]);
    //2. Check if user exist
    if (user.rows.length !== 0) {
      return res.status(401).send('User already exist.');
    }
    //3. Bcyrpt the user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);
    //4.Enter the user infos inside the database.
    const newUser = await pool.query(
      'INSERT INTO USERS (user_first_name, user_last_name, user_email, user_password) VALUES($1, $2, $3, $4) RETURNING *',
      [firstName, lastName, email, bcryptPassword]
    );
    //5. generating jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error.');
  }
});

// LOGIN ROUTE

router.post('/login', async (req, res) => {
  try {
    //1. destructure the req.body
    const { email, password } = req.body;
    //2. check if user doesn t exist
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json('Password or Email incorrect');
    }
    //3. check if password match
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    if (!validPassword) {
      return res.status(401).json('Password or Email is incorrect');
    }
    //4. give jwt token
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
