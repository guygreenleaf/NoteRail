const Notes = require('../models/noteModel')

const noteCtrl = {
    getNotes: async (req, res) =>{
        try{
            // res.json(req.user.id)
            const notes = await Notes.find({user_id: req.user.id})
            res.json(notes)
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    createNote: async(req, res) =>{
        try {
            const {title, content, date} = req.body;
            const newNote = new Notes({
                title,
                content,
                date,
                user_id: req.user.id,
                name: req.user.name
            })
            
            await newNote.save()
            res.json({msg: "New Note successfully created!"})
            
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    }
}

module.exports = noteCtrl