const express=require("express");
const auth=require("../middlewares/auth");
const router=express.Router();
const validate = require("../middlewares/validate");
const { createTodoSchema, updateTodoSchema } = require("../validation/todo.validation");

const{
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
}=require("../controllers/todo.controller");

router.post("/", auth, validate(createTodoSchema), createTodo);
router.get("/",auth,getAllTodos);
router.get("/:id",auth,getTodoById);
router.put("/:id", auth, validate(updateTodoSchema), updateTodo);
router.delete("/:id",auth,deleteTodo);

module.exports=router;