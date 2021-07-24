const express = require('express');
const app = express();
const passwordHash = require('password-hash');

const hashedPassword = passwordHash.generate('password123');

app.listen(5000, console.log('Server running on 5000'));

app.get('/', (req, res) => {
    console.log(hashedPassword);
    console.log(passwordHash.verify('hello', hashedPassword));
    res.send('hii');
});
