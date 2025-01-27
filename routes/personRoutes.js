const express = require('express');
const person = require('../data/person');
const router = express.Router();

router.post('/',async function(req, res) {
    try{
        const data = req.body;
    const newPerson = new person(data);

   const savedPerson = await newPerson.save();
 
    console.log('data saved successfully');
    res.status(200).json(savedPerson);
        
   
    }
    catch(error){
        
            console.log('Error saving person:', error);
            res.status(500).json({error: 'Internal server error'});
       
    }
    
} )

//Get method to get the person
router.get('/', async (req, res)=>{
    try{
        const data = await person.find();
        console.log('data fetched successfully');
        res.status(200).json(data);

    }catch(err){
            console.log('Error saving person:', error);
            res.status(500).json({error: 'Internal server error'});
       

    }
})

//parameterised url:
router.get('/:workType',async (req, res)=>{
    try{
    const workType = req.params.workType;
    if(workType =='chef' || workType =='waiter' || workType =='manager' )
    {
            const data = await person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(data);

    }else{
        res.status(404).json({error: "invalid work type"});
    }

    }catch(err){
        console.log('Error fetching menu:', err);
        res.status(500).json({error: 'Internal server error'});
    }
})
router.put('/:id', async (req, res)=>{
    try{
        const personid = req.params.id;
        const updatedData = req.body;

        const resonse = await person.findByIdAndUpdate(personid, updatedData, {
            new: true, //return the updated document
            runValidators: true
        })
        if(!response){
            res.status(404).json({error: "not found"})
        }
        console.log('Data updated');
        res.status(200).json(response);
    }catch(err){

        console.log('Error fetching menu:', err);
        res.status(500).json({error: 'Internal server error'});
    }
})
router.delete('/:id', async (req, res) =>{
    try{
        const personid = req.params.id;
        const resonse = person.findByIdAndRemove(personid);
        if(!response){
            res.status(404).json({error: "not found"})
        }
        console.log('Data deleted');
        res.status(200).json(response);
    }catch(err){

        console.log('Error fetching menu:', err);
        res.status(500).json({error: 'Internal server error'});
    }
})


module.exports = router;