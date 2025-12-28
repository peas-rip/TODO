const Todo=require("../models/todo.model");

exports.createTodo = async (req, res) => {
    try
    {
    const {title,description}=req.body;
    if(!title)
    {
        return res.status(400).json({message:"Title is required"});
    }
    const todo=await Todo.create(
        {
            title,
            description,
            owner:req.user._id
        }
    )
    res.status(201).json({todo});
    }catch(err)
    {
        console.log("Create todo err",err);
        res.status(500).json({message:"Internal Server Error"});
    }
};
exports.getAllTodos = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Sorting
    const sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    // Count total todos
    const totalTodos = await Todo.countDocuments({
      owner: req.user._id
    });

    // Fetch todos with pagination + sorting
    const todos = await Todo.find({ owner: req.user._id })
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalTodos / limit);

    res.status(200).json({
      page,
      limit,
      totalTodos,
      totalPages,
      sortBy,
      order: order === 1 ? "asc" : "desc",
      todos
    });

  } catch (err) {
    console.error("Fetching todos failed", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.getTodoById = async (req, res) => {
    try{
    const todo=await Todo.findOne({_id:req.params.id,owner:req.user._id});
    if(!todo)
    {
        return res.status(404).json({message:"Todo not found"});
    }
    res.status(200).json({todo});

    }catch(err)
    {
        console.log("Fetch todo failed",err);
        res.status(500).json({message:"Internal Server Error"});
    }
};
exports.updateTodo = async (req, res) => {
    try{
        const updateTodo=await Todo.findOneAndUpdate(
            {_id:req.params.id,owner:req.user._id},
            {$set:req.body},
            {new:true});
        if(!updateTodo)
        {
            return res.status(404).json({message:"Todo not found"});
        }
        res.status(200).json({todo:updateTodo});
    } catch(err)
    {
        console.log("Uodate todos failed");
        res.status(500).json({message:"Internal Server Error"});
    }
};
exports.deleteTodo = async (req, res) => {
    try
    {
        const deleteTodo=await Todo.findOneAndDelete({_id:req.params.id,owner:req.user._id});
        if(!deleteTodo)
        {
            return res.status(404).json({message:"Todo not found"});
        }
        res.status(200).json({message:"Todo Deleted"});
    }catch(err)
    {
        console.log("Cannot delete todo",err);
        res.status(500).json({message:"Internal Server Error"});
    }

};
