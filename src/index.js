// required('dotenv').config();
import dotenv from 'dotenv'
import connectDB from './db/index.js'

dotenv.config({
    path:'./env'
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`server is running at port : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Mongodb connection failed !!! ",err);

})















// ( async ()=>{
//     try {
//      await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//       app.on("error",()=>{
//         console.log("ERROR",error);
//         throw error
//       })
        
//       app.listen(process.env.PORT,()=>{
//         console.log(`app is listening at PORT ${process.env.PORT}`);

//       })
//     } catch (error) {
//         console.error("ERROR: ",error);
//         throw error
//     }
// })()
