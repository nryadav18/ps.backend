const express = require("express")
const Controllers = require("../controllers/getLocalSongData")
const Route = express.Router();

Route.get("/get-data",Controllers.getData)

module.exports = Route;