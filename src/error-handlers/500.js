'use strict';
module.exports = (err, req, res, next) => {
    // Sometimes, errors come in as an object, others as a string
    const error = err.message ? err.message : err;
    res
        .status(500)
        .json({
            error: 500,
            statusMessage: "SERVER ERROR"
        })
}