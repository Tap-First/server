"use strict"
module.exports = (err, req, res, next) => {
    // console.log(err, "==============================================");
    if (err.status && err.msg) {
        res.status(err.status).json(err.msg)
    } else if (err.status && err.message) {
        res.status(err.status).json(err.message)
    } else if (err.name === "CastError") {
        res.status(404).json("Data Not Found")
    }
}