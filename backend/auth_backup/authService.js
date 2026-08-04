import { createToken, verifyToken } from '../../domain/auth/jwt.js';

import { verifyPassword } from '../../domain/auth/password.js';



const unauthorized = (
    message = 'Invalid email or password.'
) => {

    const error =
        new Error(message);

    error.statusCode = 401;

    return error;

};

export const createAuthService = (
    repository,
    secret = 'development-secret'
) => ({

    async login(
        {
            email,
            password
        },
        ipAddress
    ){


        if(!email || !password){

            const error =
                new Error(
                    'Email and password are required.'
                );

            error.statusCode = 422;

            throw error;

        }

        const user =
            await repository.findUserByEmail(
                email.trim().toLowerCase()
            );

        if(
            !user ||
            !verifyPassword(
                password,
                user.passwordHash
            )
        ){


            await repository.recordAudit({

                action:
                    'login.failed',

                ipAddress,

                targetEntity:
                    'Users'

            });



            throw unauthorized();


        }

        if(user.status !== 'active'){


            throw unauthorized(
                'This user account is deactivated.'
            );


        }

        const role =
            await repository.findRoleById(
                user.roleId
            );

        const token =
            createToken(

                {
                    sub:user.id,

                    role:role.name,

                    email:user.email

                },

                secret

            );

        await repository.recordAudit({

            userId:
                user.id,

            action:
                'login',

            targetEntity:
                'Users',

            targetId:
                user.id,

            ipAddress

        });

        return {

            token,

            expiresIn:
                8 * 60 * 60,

            user:
                repository.publicUser(
                    user,
                    role
                )

        };


    },

    async authenticate(
        authorization
    ){


        if(
            !authorization ||
            !authorization.startsWith(
                'Bearer '
            )
        ){

            throw unauthorized(
                'A bearer token is required.'
            );

        }

        let claims;


        try{


            claims =
                verifyToken(
                    authorization.slice(7),
                    secret
                );


        }
        catch(error){


            throw unauthorized(
                error.message
            );


        }

        if(
            await repository.isTokenRevoked(
                claims.jti
            )
        ){


            throw unauthorized(
                'This session has been signed out.'
            );


        }

        const user =
            await repository.findUserById(
                claims.sub
            );

        if(
            !user ||
            user.status !== 'active'
        ){


            throw unauthorized(
                'This user account is unavailable.'
            );


        }

        const role =
            await repository.findRoleById(
                user.roleId
            );

        return {

            claims,

            user:
                repository.publicUser(
                    user,
                    role
                )

        };


    },

    async logout(
        authorization,
        ipAddress
    ){


        const {
            claims,
            user
        } =
            await this.authenticate(
                authorization
            );

        await repository.revokeToken(
            claims.jti,
            claims.exp
        );

        await repository.recordAudit({

            userId:
                user.id,

            action:
                'logout',

            targetEntity:
                'Users',

            targetId:
                user.id,

            ipAddress

        });


    }



});