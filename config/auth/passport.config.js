import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UserModel } from '../../models/user.model.js';

const cookieExtractor = (req) => {
    const name = process.env.JWT_COOKIE_NAME || 'jwt';
    return req?.cookies?.[name] || null;
};

export const configurePassport = (passport) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw Object.assign(new Error('JWT_SECRET is not set'), { status: 500 });

    const jwtOpts = {
        secretOrKey: secret,
        jwtFromRequest: ExtractJwt.fromExtractors([
            cookieExtractor,
            ExtractJwt.fromAuthHeaderAsBearerToken()
        ])
    };

    const verify = async (payload, done) => {
        try {
            const user = await UserModel.findById(payload.id).lean();
            if (!user) return done(Object.assign(new Error('User not found'), { status: 401 }), false);

            const { password, ...safeUser } = user;
            return done(null, safeUser);
        } catch (err) {
            return done(err, false);
        }
    };

    passport.use('jwt', new JwtStrategy(jwtOpts, verify));

    passport.use('current', new JwtStrategy(jwtOpts, verify));
};