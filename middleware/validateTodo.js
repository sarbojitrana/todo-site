

const validateTodo = (req, res, next) =>{
    const {title, dueDate} = req.body;
    if( !title || typeof title !== 'string' || title.trim() === ''){
        return res.status(400).json({
            error: {
                message : `Invalid task: "title" is required and must be a non-empty string.`
            }
        })
    }

    if(dueDate){
        const date = new Date(dueDate);
        if(isNaN(date.getTime())){
            return res.status(400).json({
                error:{
                    message: `"dueDate" must be valid ISO date string with time`
                }
            })
        }
        req.body.dueDate = date.toISOString() ;
    }
    next();

}

module.exports = validateTodo ;