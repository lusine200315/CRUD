function start(req, res, next) {
    req.start = Date.now();
    next();
};

module.exports = start;