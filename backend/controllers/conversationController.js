//api/messages/delete/:id

export const createConversation = async (req, res) => {
    try {
        const { participants } = req.body
        const result = await Conversation.findOne({ participants: { $all: participants } });
        if (result)
            return res.status(409).json({ error: "Conversation already exists" })

        const newConversation = await Conversation.create({      //New conversation
            participants: participants,
        })

        if (newConversation) {
            await newConversation.save()
            res.status(201).json({                          //Return conversation data
                _id: newConversation._id,
            })
        }

    } catch (error) {
        console.log("Error in createConversation controller: ", error.message)
        res.status(500).json({ error: "Internal server error" })

    }
}

export const deleteConversation = async (req, res) => {
    try {
        const { id: conversationID } = req.params;
        const result = await Conversation.deleteOne({ _id: conversationID });

        if (!result.deletedCount) {
            return res.status(404).json({ error: "Conversation not found" });
        }

        res.status(200).json({ message: "Conversation deleted successfully" });
    } catch (error) {
        console.log("Error in deleteConversation controller: ", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}