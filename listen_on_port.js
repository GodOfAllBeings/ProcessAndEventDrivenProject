const express = require('express')
const app = express()
const port = 3080

app.use(express.json());

app.post('/', (req, res) => {
    console.log(JSON.stringify(req.body))
    res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})