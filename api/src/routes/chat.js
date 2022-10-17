const { Router } = require("express");
const { Chat, Message, User, Worker } = require("../db.js");

const router = Router();

router.get('/', async (req,res,next) => {
    try{
        let inbox = await Chat.findAll({
            include: [
                {model:User, as:"Host"},
                {model: Message}
            ]
        })

        res.status(200).send(inbox)
    }catch(error){
        res.send('Must be a problem:' + error.message).status(404);
    }
})

module.exports = router;