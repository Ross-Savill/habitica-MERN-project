const express = require('express');

const app = new express();
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    return res.send('hello world from api')
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})