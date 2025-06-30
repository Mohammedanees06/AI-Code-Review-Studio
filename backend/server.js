require('dotenv').config();
const app =require('./src/app')
const cors = require('cors');
app.use(cors());




app.listen(3000, ()=> {
    console.log('server is running on http://localhost:3000')
})