import mongoose from "mongoose";

export const connectDatabase = async () => {
    // console.log(process.env.mongodb_path2)
    await mongoose.connect(process.env.mongodb_path2)
                  .then((data) => {
                    console.log(`-- db connected --`.bgGreen)
                  })
                  .catch((err) =>{
                    console.log(`-- err in db connection: `.bgRed.black)
                    console.log(err)
    })
    // try {
    //   await mongoose.connect(process.env.mongodb_path)
    //   console.log(`-- db connected OK --`.bgGreen)
    // } catch (error) {
    //   console.log(`-- err in db bad-connection : `.bgRed.black)
    //   console.log(error)
    // }
}