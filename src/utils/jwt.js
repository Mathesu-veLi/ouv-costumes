import jwt from 'jsonwebtoken';

module.exports = {
    signAccessToken(payload) {
        const { email, password } = payload;

        return new Promise((resolve, reject) => {
            jwt.sign(
                { email, password },
                process.env.TOKEN_SECRET,
                {
                    expiresIn: process.env.TOKEN_EXPIRATION,
                },
                (err, token) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(token);
                },
            );
        });
    },
};
