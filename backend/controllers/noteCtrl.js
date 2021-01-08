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
    getAllNotes: async (req, res) =>{
        try {
            const allNotes = await Notes.find({isShared:true})
            res.json(allNotes);
        } catch (error) {
            return res.status(500).json({msg: error.message})
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
                name: req.user.name,
                isShared: false
            })
            
            await newNote.save()
            res.json({msg: "New Note successfully created!"})
            
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    //ADD DELETE VERIFICATION SCREEN
    deleteNote: async(req, res) =>{
        try {
            await Notes.findByIdAndDelete(req.params.id)
            res.json({msg: "Note deleted."})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    updateNote: async(req, res) =>{
        try {

            const {title, content} = req.body;
            await Notes.findOneAndUpdate({_id: req.params.id}, {
                title,
                content
            })
            
            res.json({msg: "Updated Note"})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    updateVisibility: async(req, res) =>{
        try {
            const {isShared} = req.body
            const identifier = req.params.id
            let public = await Notes.findById(req.params.id)
        
            // res.json(public.isShared);

            const note = await Notes.findOneAndUpdate({_id: identifier}, {
                isShared: !public.isShared
            })


            res.json({msg: "Updated Note"})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    getNote: async (req, res) => {
        try {
            const note = await Notes.findById(req.params.id)
            res.json(note)
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    }
}

module.exports = noteCtrl