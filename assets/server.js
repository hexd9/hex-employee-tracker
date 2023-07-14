const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'courses_db'
    },
    console.log(`Connected to the courses_db database.`)
  );

  // Query database
db.query('SELECT * FROM course_names', function (err, results) {
    console.log(results);
  });