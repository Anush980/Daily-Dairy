
const getNotes = (req ,res)=>{
    res.status(200).json({
    msg:"get"
    });
}

const postNotes = (req,res)=>{
    console.log(req.body);
    res.status(200).json({
        msg:"post"
    });
}

const updateNotes =(req,res)=>{
    const {id} = req.params;
     res.status(200).json({
        msg:"update",id
        });}

const deleteNotes= (req,res)=>{
    const {id} = req.params;
     res.status(200).json({
        msg:"delete",id
            });
        }

module.exports = {getNotes,postNotes,updateNotes,deleteNotes}