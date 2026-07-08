const aH = (fn) => {
    return fn(req, res, next).catch(next);
}