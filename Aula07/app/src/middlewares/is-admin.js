

const isAdmin = (req, res, next) => {
    if (req.session.user?.role !== "ADMIN") {
        return res.status(403).json({ error: 'ONLY ADMINS' });
    }   
    next();
}

export { isAdmin };