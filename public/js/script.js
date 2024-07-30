const socket=io();  //initialise socketio dew to this a connection request is sand to backend(app.js)

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
       const{latitude,longitude } =position.coords; //find positin 
       socket.emit("send-location",{latitude,longitude});//sand position to backend

    },
(error)=>{ // if error ocurs then run 
    console.error(reeor); // error will be return on console
},{ //setting
    enableHighAccuracy:true,
    timeout:5000,  //time out in 5 sec
    maximumAge:0 // hen data ned pick up data imidiat li dont take case data
}
);
}
const map=L.map("map").setView([0,0], 10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"My_attribute"
}).addTo(map)

const markers={};
socket.on("receive-location",(data)=>{
    const{ id,latitude,longitude}=data;
    map.setView([latitude,longitude],10);
    if(markers[id]){
        markers[id].setLatLng([latitude,longitude]);
    }
    else{
        markers[id]=L.marker([latitude,longitude]).addTo(map);
    }
});

socket.on("user-disconneted",(id)=>{
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }
})