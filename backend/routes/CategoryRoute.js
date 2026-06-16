const express = require("express");
const RequireAuth = require("../middleware/RequireAuth");
const { getAllCategories, getNotesFromCategory, removeCategory } = require("../controllers/CategoryController");
const CategoryRoute = express.Router();

CategoryRoute.use(RequireAuth);

CategoryRoute.get("/get-all-categories", getAllCategories);

CategoryRoute.get("/get-category-notes/:id", getNotesFromCategory);

CategoryRoute.delete("/remove/:id", removeCategory);

module.exports=CategoryRoute;