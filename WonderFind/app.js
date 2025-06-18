const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const MONGO_URL = "mongodb://127.0.0.1:27017/wonderfind";
const ejsMate = require("ejs-mate");

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

main()
  .then((res) => {
    console.log("connected successfully");
  })
  .catch((err) => console.log(err));

  async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
  res.send("Hii, I Am Root");
});

//index route
app.get("/listings", async(req,res)=>{
 const allListings = await Listing.find({});
 res.render("listings/index.ejs",{allListings});
});

//new routes
app.get("/listings/new",(req,res)=>{
  res.render("listings/new.ejs");
});
//show route
app.get("/listings/:id", async(req,res)=>{
  let {id} = req.params;
 const listing = await Listing.findById(id);
  res.render("listings/show.ejs",{listing})
});

//create routes
app.post("/listings", async (req,res)=>{
  // let {title,description,image,price,location,country} = req.body;
   let listing = req.body.listing;
   const newListing = new Listing(listing);
   await newListing.save();
   res.redirect("/listings");
})

//edit routes
app.get("/listings/:id/edit", async (req,res)=>{
  let {id} = req.params;
 const listing = await Listing.findById(id);
 res.render("listings/edit.ejs", {listing});
});

//update routes 
app.put("/listings/:id", async (req,res)=>{
  let {id} = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  res.redirect(`/listings/${id}`);
});

//delete route
app.delete("/listings/:id", async (req,res)=>{
  let {id} = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect(`/listings`);
});

// app.get("/testListing",async(req,res)=>{
//   let sampleListing = new Listing({
//     title:"Welcome To Tree House",
//     description:"Budget Friendly",
//     price:6000,
//     location:"Lonavala,Maharashtra",
//     country:"India"
//   });
//   await sampleListing.save();
//   console.log("the sample was saved");
//   res.send("successful testing");
// });

app.listen(8080, () => {
  console.log("app is listening on 8080");
});
