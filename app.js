const express=require("express");
const https = require("https");
const bodyParser= require("body-parser");


const app=express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
res.sendFile(__dirname + "/index.html");

});

app.post("/",function(req,res){

const city=req.body.CityName;
const unit= req.body.unit;

  const url="https://api.openweathermap.org/data/2.5/weather?q=" + city +"&units=" + unit + "&appid=86679d8f19aa7d6f581fa6c612bd4253";

    https.get(url,function(response){
      // console.log(response);
      console.log(response.statusCode);
      response.on("data", function(data){
        const norm = JSON.parse(data);
        const temperature = norm.main.temp;
        const des= norm.weather[0].description;
        const icon= norm.weather[0].icon;
        const imageUrl="http://openweathermap.org/img/wn/"+ icon +"@2x.png";
        res.write("<p>the weather description is " + des + ".</p>")
          res.write("<h1>the temperature in "+ city +" is " + temperature + " degree "+ unit +"</h1>");
          res.write("<img src="+imageUrl+">");
          res.send();

      })
    })
})


app.listen(3000, function(){
  console.log("our server is running in port 3000");
});
