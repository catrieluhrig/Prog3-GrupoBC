export const autorizarRoles = (rolesAutorizados = []) => {
    return (req, res, next) => {
        const usuario = req.user;

        if (!usuario || !rolesAutorizados.includes(usuario.rol)) {
            return res.status(403).json({
                status: false,
                msg: 'Acceso denegado'
            });
        }

        next();
    };
};