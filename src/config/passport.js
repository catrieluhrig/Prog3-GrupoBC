import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt"
import { Strategy as LocalStrategy } from "passport-local"
import { getUsuario } from "../services/serviceUsuarios.js"
import { getUsuarioById } from "../services/serviceUsuarios.js"

const estrategia = new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
},
    async(email, password, done) => {
        try{
            const usuario = await getUsuario(email,password)
            if(!usuario){
                return done(null, false, {status: false, msg: "La autenticación falló"})
            }
            return done(null, usuario, {status:true, msg: "Autenticación correcta"})
        }catch(error){
            return done(error, false)
        }
    }
)

const validarToken = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRETA
}, 
    async(jwtPayload, done) => {
        const usuario = await getUsuarioById(jwtPayload.id_usuario)
        if(!usuario){
            return done(null, false, {status: false, msg: "Token inválido"})
        }
        return done(null, usuario)
    }
)

export {validarToken, estrategia}