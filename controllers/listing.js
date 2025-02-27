const Listing=require('../models/listing.js');
const mapToken=process.env.MAP_TOKEN;
module.exports.index=async (req,res)=>{
    const AllListings=await Listing.find({});
    res.render('./listings/index.ejs',{AllListings});
 };
 module.exports.newListing=(req,res)=>{
    res.render('listings/newForm.ejs');
};

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id).populate({path:"reviews",populate:{path:'author'}}).populate('owner');
    if(!listing){
        req.flash("error","Listing is Deleted or Not Found");
      res.redirect('/listings')
    }
    res.render('listings/show.ejs',{listing});
};
module.exports.CreateListing= async (req, res) => {
        const response = await fetch(`https://api.maptiler.com/geocoding/${req.body.listing.location}.json?key=${mapToken}`);
                const data = await response.json();
                if (data.features.length > 0) {
                    const [lng, lat] = data.features[0].geometry.coordinates;
                       } else {
                    console.log("No coordinates found for the given location.");
                }
               
    let url=req.file.path;
    let filename=req.file.filename;
    const newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    newListing.coordinates=data.features[0].geometry.coordinates;
    
   await newListing.save();
   req.flash("success","New Listing Created Successfully!");
   res.redirect('/listings');  };
   module.exports.EditListing=async(req,res)=>{
    let {id}=req.params;
    const lits= await Listing.findById(id);
    if(!lits){
        req.flash("error","Listing is Deleted or Not Found");
        res.redirect('/listings');  }
        let OriginalImageUrl=lits.image.url;
       OriginalImageUrl= OriginalImageUrl.replace("/upload",'/upload/w_250');
    res.render('listings/edit.ejs',{lits,OriginalImageUrl});
};
module.exports.EditedListing=async(req,res)=>{
    let {id}=req.params;
   let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});
   if(typeof req.file !=="undefined"){  
   let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();}
  req.flash("success"," Listing Updated Successfully!")
  res.redirect(`/listings/${id}`);
};
module.exports.DeleteListing=async (req,res)=>{
    let {id}=req.params;
   let Deleted= await  Listing.findByIdAndDelete(id);
   console.log(Deleted);
   req.flash("success"," Listing Deleted Successfully!")
   res.redirect('/listings')
}
