const express= require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('server started')
})

app.use('/api/ai', aiRoutes);



module.exports = app;