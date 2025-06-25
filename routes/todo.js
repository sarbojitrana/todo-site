const express = require('express');
const router = express.Router();

const validateTodo = require('../middleware/validateTodo')



const {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
} = require('../controllers/todoController');


router.get('/', getTodos);
router.post('/', validateTodo, createTodo);
router.put('/:id', validateTodo, updateTodo);
router.delete('/:id',  deleteTodo);

router.use((req, res)=>{
    res.status(404).json({
        error :{
            message : `Invalid /todos path`
        }
    })
})

module.exports = router;
