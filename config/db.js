import mongoose from "mongoose";
import colors from 'colors'

const connectBD=async ()=>{
      try {
        const conn=await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to Database ${conn.connection.host}`.yellow)
      } catch (error) {
        console.log(`Error in MongoDB ${error}`.red)
      }
}

export default connectBD;