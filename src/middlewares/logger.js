const express = require('express')

const logTimer = (req, res, next) => {
    console.log(new Date().toLocaleString());
    next()
}

module.exports = { logTimer }