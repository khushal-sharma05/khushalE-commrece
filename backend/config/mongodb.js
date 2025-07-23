import mongoosse from 'mongoose'
const connectDB=async ()=>{
    mongoosse.connection.on('connected',()=>{
        console.log('DB CONNECTED');
        
    })

    await mongoosse.connect(`${process.env.MONGO_URI}`)
}
export default connectDB