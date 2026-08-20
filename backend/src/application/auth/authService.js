import {
    createToken,
    verifyToken
} from "../../domain/auth/jwt.js";

import {
    hashPassword,
    verifyPassword
} from "../../domain/auth/password.js";

import {
    ROLES
} from "../../domain/auth/roles.js";


const createError = (
    message,
    statusCode
) => {

    const error =
        new Error(message);

    error.statusCode =
        statusCode;

    return error;

};


const allowedLoginRoles = {

    web:
        new Set([
            ROLES.ADMINISTRATOR,
            ROLES.SUPERVISOR
        ]),

    mobile:
        new Set([
            ROLES.CUSTOMS_OFFICER
        ])

};


export const createAuthService = (
    repository,
    secret = "development-secret"
) => ({

    async login(
        credentials,
        ipAddress,
        platform = "web"
    ) {

        const {
            email,
            password
        } = credentials;


        if (
            !email ||
            !password
        ) {

            throw createError(
                "Email and password are required.",
                422
            );

        }


        const user =
            await repository.findUserByEmail(
                email
                    .trim()
                    .toLowerCase()
            );


        if (!user) {

            throw createError(
                "Invalid email or password.",
                401
            );

        }


        const passwordValid =
            verifyPassword(
                password,
                user.passwordHash
            );


        if (!passwordValid) {

            await repository.recordAudit({

                action:
                    "login.failed",

                ipAddress,

                targetEntity:
                    "Users"

            });


            throw createError(
                "Invalid email or password.",
                401
            );

        }


        if (
            user.status !== "active"
        ) {

            throw createError(
                "User account is inactive.",
                401
            );

        }


        const role =
            await repository.findRoleById(
                user.roleId
            );


        if (!role) {

            throw createError(
                "User role unavailable.",
                401
            );

        }


        const platformRoles =
            allowedLoginRoles[
                platform === "mobile"
                    ? "mobile"
                    : "web"
            ];


        if (
            !platformRoles.has(
                role.name
            )
        ) {

            throw createError(

                platform === "mobile"

                    ? "This account is not authorized to use the mobile application."

                    : "This account is not authorized to use the web dashboard.",

                403

            );

        }


        const token =
            createToken(
                {
                    sub:
                        user.id,

                    email:
                        user.email,

                    role:
                        role.name
                },
                secret
            );


        await repository.recordAudit({

            userId:
                user.id,

            action:
                "login",

            targetEntity:
                "Users",

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
    ) {

        if (
            !authorization ||
            !authorization.startsWith(
                "Bearer "
            )
        ) {

            throw createError(
                "Bearer token required.",
                401
            );

        }


        let claims;


        try {

            claims =
                verifyToken(
                    authorization.slice(7),
                    secret
                );

        }
        catch (error) {

            throw createError(
                error.message,
                401
            );

        }


        const user =
            await repository.findUserById(
                claims.sub
            );


        if (
            !user ||
            user.status !== "active"
        ) {

            throw createError(
                "User unavailable.",
                401
            );

        }


        const role =
            await repository.findRoleById(
                user.roleId
            );


        if (!role) {

            throw createError(
                "User role unavailable.",
                401
            );

        }


        return {

            claims,

            user:
                repository.publicUser(
                    user,
                    role
                )

        };

    },


    async changePassword(
        authorization,
        newPassword
    ) {

        const {
            user
        } =
            await this.authenticate(
                authorization
            );


        if (
            !newPassword ||
            newPassword.length < 8
        ) {

            throw createError(
                "Password must contain at least 8 characters.",
                422
            );

        }


        await repository.changePassword(
            user.id,
            newPassword
        );


        return {

            success:
                true,

            message:
                "Password changed successfully."

        };

    },


    async logout(
        authorization,
        ipAddress
    ) {

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
                "logout",

            targetEntity:
                "Users",

            targetId:
                user.id,

            ipAddress

        });

    }

});