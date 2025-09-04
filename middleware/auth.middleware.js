import passport from 'passport';

export const requireAuth = (strategy = 'jwt') =>
    (req, res, next) =>
        passport.authenticate(strategy, { session: false, failWithError: true })(req, res, next);

export const requireRole = (...roles) =>
    (req, res, next) => {
        if (!req.user) return next(Object.assign(new Error('Unauthorized'), { status: 401 }));
        if (!roles.includes(req.user.role)) {
            return next(Object.assign(new Error('Forbidden: insufficient role'), { status: 403 }));
        }
        return next();
    };

export const requireSelfOrAdmin = () =>
    (req, res, next) => {
        const isSelf = req.user?.id?.toString() === req.params.id;
        const isAdmin = req.user?.role === 'admin';
        if (!isSelf && !isAdmin) {
            return next(Object.assign(new Error('Forbidden'), { status: 403 }));
        }
        return next();
    };