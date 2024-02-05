import dotenv from 'dotenv'
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

dotenv.config()

const authRouter = require('./routes/auth')

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Db connected')).catch((err) => console.log(err))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', authRouter)



app.listen(process.env.PORT || port, () =>  console.log(`Server Listening on port ${port}...`))
   
