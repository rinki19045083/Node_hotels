const express = require('express');
const menu = require('../data/menu');
const router = express.Router();

//menu post:

router.post('/',async function(req, res) {
    try{
        const dish = req.body;
    const newdish = new menu(dish);

   const saveddish = await newdish.save();
 
    console.log('dish saved successfully');
    res.status(200).json(saveddish);
        
   
    }
    catch(error){
        
            console.log('Error saving dish:', error);
            res.status(500).json({error: 'Internal server error'});
       
    }
    
} )

//menu get
router.get('/', async (req, res)=>{
    try{
        const data = await menu.find();
        console.log('menu fetched successfully');
        res.status(200).json(data);

    }catch(err){
            console.log('Error fetching menu:', err);
            res.status(500).json({error: 'Internal server error'});
       

    }
})

module.exports = router;
