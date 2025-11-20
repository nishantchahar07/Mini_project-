const router=require("express").Router();
const authMiddleware=require("../middlewares/auth");
const checkTextTable=require("../middlewares/textM");
const pool=require("../db/db");
router.use(checkTextTable);

router.get("/",async(req,res)=>{
    try{
        const lang = req.query.lang || 'en';
        const texts = await pool.query("SELECT * FROM texts WHERE lang=$1", [lang]);
        
        const textObj = {};
        texts.rows.forEach(row => {
            textObj[row.key] = row.content;
        });
        
        return res.json(textObj);
    }catch(err){
        return res.status(500).json({error:err.message});
    }
});

router.get("/get",async(req,res)=>{
    try{
        const texts=await pool.query("SELECT * FROM texts");
        return res.json(texts.rows);
    }catch(err){
        return res.status(500).json({error:err.message});
    }
});
router.get("/get/:page/:lang",async(req,res)=>{
    try{
        const {page,lang}=req.params;
        const texts=await pool.query("SELECT * FROM texts WHERE page=$1 AND lang=$2",[page,lang]);
        return res.json(texts.rows);
    }catch(err){
        return res.status(500).json({error:err.message});
    }
});
router.post("/create",async(req,res)=>{
    try{
        const {page,key,lang,content}=req.body;
        const newText=await pool.query("INSERT INTO texts (page,key,lang,content) VALUES ($1,$2,$3,$4) RETURNING *",[page,key,lang,content]);
        return res.status(201).json(newText.rows[0]);
    }catch(err){
        return res.status(500).json({error:err.message});
    }
});

module.exports=router;