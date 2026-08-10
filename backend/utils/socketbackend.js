
 const socketHandle = (io)=>{
 console.log('socket stared :: ')
 io.on('connection',(socket)=>{
    console.log('connected to socket in forntend !',socket.id)



    socket.on('disconnect',()=>{
        console.log(' socket disconnected')
    })
 })

}

export default socketHandle