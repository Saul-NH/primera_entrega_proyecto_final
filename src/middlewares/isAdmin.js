module.exports = (req, res, next) => {
    const isAdmin = req.headers.admin;

    if (!isAdmin || isAdmin === 'false') {
        return res.json({
            error: {code:-1,description:`Route /api/products method ${req.method} not allowed`}
        });
    }
    next();
}