const Product = require('../Model/productSchema');


exports.addProducts = async (req, res) => {
    console.log("Inside the addProducts method");
    const { title, description, category, leasingPeriod, leasingPrice } = req.body;
    const productImage = req.file.filename;
    const userId = req.payload;
    console.log(title, description, category, leasingPeriod, leasingPrice, productImage);
    console.log(userId);

    try {
        const existingProduct = await Product.findOne({ description });

        if (existingProduct) {
            return res.status(409).json({ message: "Product already exists" });
        } else {
            const newProduct = new Product({ title, description, category, leasingPeriod, leasingPrice, productImage, userId });
            await newProduct.save();
            return res.status(200).json(newProduct);
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


//3 get all projects details
exports.getAllUserProducts = async (req,res)=>{

    const searchKey = req.query.search
    console.log(searchKey);
    //avoid case sensitivity
    let query ={}
    if(searchKey){
       query.title={ $regex :searchKey, $options :"i"} // 5 search nte code 
    }

    try{
        const AllUserProducts = await Product.find(query)
        if (AllUserProducts) {
            res.status(200).json(AllUserProducts)
        }else{
            res.status(404).json("Can't find product")

        }
    }catch (err){
        res.status(500).json({message:err.message})

    }
}

// 4 get one user products

exports.getAUserproduct = async (req,res)=>{
    //get user id and particular user project
    const userId = req.payload
    try{
        const Aproduct = await Product.find({userId})
        if (Aproduct) {
            res.status(200).json(Aproduct)
        }else{
            res.status(404).json("Can't find product")

        }
    }catch (err){
        res.status(500).json({message:err.message})

    }
}




//2 get 3 projects details for home project
exports.getHomeProducts = async (req,res)=>{
    try{
        const homeProducts = await Product.find().
        limit(8)
        if (homeProducts) {
            res.status(200).json(homeProducts)
        }else{
            res.status(404).json("Can't find product")

        }
    }catch (err){
        res.status(500).json({message:err.message})

    }
}




//5 update user product

exports.updateUserProducts = async (req,res)=>{
    const { title, description,category, leasingPeriod, leasingPrice, productImage} = req.body
    userId = req.payload
    const {pid} = req.params
    const uploadsImage = req.file?req.file.filename:productImage
    try{
        //find pasrticular project , update the data and save the changes
        const updateProduct = await Product.findByIdAndUpdate({_id:pid},{ title, description,category, leasingPeriod, leasingPrice, productImage:uploadsImage,userId})
        await updateProduct.save()
        res.status(200).json(updateProduct)
 
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

/// 5. Delete a user product
exports.deleteAdminUserProducts = async (req, res) => {
    const { pid } = req.params;
    try {
        const deleteUserProducts = await Product.findOneAndDelete({ _id: pid });
        return res.status(200).json(deleteUserProducts);
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
};



//4   delete user product
exports.deleteAUserProducts = async(req,res)=>{
    const {pid} = req.params //get product id
    try{
    const deleteAUserProducts = await Product.findOneAndDelete({_id:pid})
    //Creates a findOneAndDelete query: atomically finds the given document, deletes it, and returns the document as it was before deletion.
    res.status(200).json(deleteAUserProducts)
    }
    catch(err){
        res.status(401).json({message:err.message})

    }
}

// Controller to get one product using its ID
exports.getOneProductUsingID = async (req, res) => {
    console.log("Inside getOneProductUsingID controller");
    const {pid}  = req.params;
    console.log(pid);
    try {
      const getOneProduct = await Product.findById({_id:pid});
      console.log(getOneProduct);
      if (getOneProduct) {
        res.status(200).json(getOneProduct);

      }else{
        res.status(401).json("Can't find product")
      }
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  };