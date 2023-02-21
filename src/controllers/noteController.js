const noteModel = require("../models/note")

const createNote = async (req, res) => {
    
    const {title, description} = req.body;
    const newNote = new noteModel({
        title : title,
        description : description,
        userId : req.userId
    })

    try {
        
        await newNote.save()
        return res.status(201).json(newNote)

    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Something went wrong"})
    }
}

const updateNote = async (req, res) => {
    const id = req.params.id
    const {title, description} = req.body

    const newNote = {
        title : title,
        description : description,
        userId : req.userId
    }

    try {
        // "new : true", doing this we get returned the new updated note
        await noteModel.findByIdAndUpdate(id, newNote, {new : true})
        return res.status(200).json(newNote)

    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Something went wrong"})
    }
}

const deleteNote = async (req, res) => {
    const id = req.params.id

    try {
        
        const deletedNote = await noteModel.findByIdAndDelete(id)
        return res.status(202).json(deletedNote)

    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Something went wrong"})
    }

}

const getNotes = async (req, res) => {
    try {

        // Getting all notes in database on basis of "userId"
        const notes = await noteModel.find({userId : req.userId})
        return res.status(200).json(notes)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Something went wrong"})
    }
}

module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getNotes
}