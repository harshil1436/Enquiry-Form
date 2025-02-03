let express= require("express")
let mongoose= require('mongoose')

let cors= require("cors")
const enqrouter = require("./App/routes/web/enquiryRoutes")
require('dotenv').config()
let app=express()
app.use(cors())
app.use(express.json())

// Import routes    

app.use('/api/enquiries', enqrouter)

// Connect to MongoDB

mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Connected to MongoDB")
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
}).catch((err)=> { console.log(err) })