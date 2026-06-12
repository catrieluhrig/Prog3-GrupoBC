import jwt from 'jsonwebtoken';
import passport from 'passport';

export const autenticar = (req, res, next) => {
    passport.authenticate(
        "local",
        { session: false },
        (error, usuario, info) => {

            if (error) {
                return res.status(500).json({
                    status: false,
                    msg: error.message
                });
            }

            if (!usuario) {
                return res.status(401).json(info);
            }

            req.login(usuario, { session: false }, error => {

                if (error || !usuario) {
                    return res.status(500).json(error);
                }

                const token = jwt.sign(
                    usuario,
                    process.env.SECRETA
                );

                return res.json({
                    status: true,
                    token
                });
            });

        }
    )(req, res, next);
};

/*export const autenticar = async (req, res) => {
    passport.authenticate("local", {session: false}, (error,usuario,info) => {
    if (error || !usuario) {
        return res.status(400).json({
            status: false,
            msg: error 
        })
    }
    req.login(usuario, {session: false}, error => {
        if (error){
            res.send(error)
        }
        
        const token = jwt.sign(usuario, process.env.SECRETA)
        return res.json({
            status: true,
            token: token
        })
        })
    }
    )
}*/