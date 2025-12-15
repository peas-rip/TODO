const { z } = require("zod");

exports.createTodoSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
  })
});

exports.updateTodoSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    completed: z.boolean().optional()
  })
});
