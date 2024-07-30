 //Boiller plate

 const express=require("express");
 const app=express();
 const path=require("path");

 //setUP socket io 
 const http=require("http");//as socket run on http server we have to creat http server
 const socketio=require("socket.io");
 const server=http.createServer(app); //our sewver for app object
 const io=socketio(server);

 //setup ejs
 app.set("view engine","ejs");
 app.set(express.static(path.join(__dirname,"public")));//setup public folder becuse our all static file  like image ,css 


 //handle connection request
 io.on("connection",function(socket){  //function(socket) this function produce unick key value . 
    socket.on("send-location",function(data){//Accipt emmited locition 
        io.emit("receive-location",{id:socket.id,...data}); //resive location send or provide to every connaction 

    });
    //console.log("connected");
    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id);
    });
 });
 app.get("/",function(req,res){
    res.render("index");}              //route creat by app.get
);
app.use('/public', express.static('public'));
server.listen(3000); // listen in particular port
