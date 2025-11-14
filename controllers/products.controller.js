const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.send('Get all products');
});

router.get('/:id',(req,res)=>{
    res.send(`Get product with ID: ${req.params.id}`);
});

module.exports=router;