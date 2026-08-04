import { createAuthController } from './interfaces/http/authController.js';
import { createAuthService } from './application/auth/authService.js';
import { MongoAuthRepository } from './infrastructure/persistence/mongoAuthRepository.js';

import { DashboardRepository } from './infrastructure/persistence/dashboardRepository.js';
import { createDashboardService } from './application/dashboard/dashboardService.js';
import { createDashboardController } from './interfaces/http/dashboardController.js';

import { DeclarationRepository } from './infrastructure/persistence/declarationRepository.js';
import { createDeclarationService } from './application/declaration/declarationService.js';
import { createDeclarationController } from './interfaces/http/declarationController.js';

import { InspectionRepository } from './infrastructure/persistence/inspectionRepository.js';
import { createInspectionService } from './application/inspection/inspectionService.js';
import { createInspectionController } from './interfaces/http/inspectionController.js';

import { createReportService } from './application/report/reportService.js';
import { createReportController } from './interfaces/http/reportController.js';

import { AIAnalysisRepository } from './infrastructure/persistence/aiAnalysisRepository.js';
import { createAIAnalysisService } from './application/aiAnalysis/aiAnalysisService.js';
import { createAIAnalysisController } from './interfaces/http/aiAnalysisController.js';

import { SynchronizationRepository } from './infrastructure/persistence/synchronizationRepository.js';
import { createSynchronizationService } from './application/synchronization/synchronizationService.js';
import { createSynchronizationController } from './interfaces/http/synchronizationController.js';

import { getMongoDatabase } from './infrastructure/database/mongo.js';
import { UserRepository } from "./infrastructure/persistence/userRepository.js";
import { createUserService } from "./application/user/userService.js";
import { createUserController } from "./interfaces/http/userController.js";

const json = (
    res,
    status,
    body
) => {

    res.writeHead(
        status,
        {
            "Content-Type":
                "application/json; charset=utf-8"
        }
    );

    res.end(
        JSON.stringify(body)
    );

};
const readBody = async (req) => {

    let value = "";

    for await (const chunk of req) {

        console.log(
            "RAW CHUNK:",
            chunk.toString()
        );

        value += chunk.toString();

    }


    console.log(
        "RAW BODY:",
        value
    );


    if(!value){

        return {};

    }


    return JSON.parse(value);

};

// const readBody = async (
//     req
// ) => {

//     let value = "";

//     for await(
//         const chunk of req
//     ){

//         value += chunk;

//         if(
//             value.length > 100000
//         ){

//             throw new Error(
//                 "Request body is too large."
//             );

//         }

//     }

//     if(!value){

//         return {};

//     }

//     return JSON.parse(value);

// };



export const createApp = async () => {

    const database =
        getMongoDatabase();


    const authRepository =
        new MongoAuthRepository(
            database
        );

    await authRepository.initialize();


    const authService =
        createAuthService(
            authRepository,
            process.env.JWT_SECRET
        );


    const auth =
        createAuthController(
            authService
        );

    const userRepository =
    new UserRepository(
        database
    );

    const userService =
        createUserService(
            userRepository
        );

    const user =
        createUserController(
            authService,
            userService
        );

    const dashboardRepository =
        new DashboardRepository();


    const dashboardService =
        createDashboardService(
            dashboardRepository
        );


    const dashboard =
        createDashboardController(
            authService,
            dashboardService
        );


    const declarationRepository =
        new DeclarationRepository();


    const declarationService =
        createDeclarationService(
            declarationRepository
        );


    const declaration =
        createDeclarationController(
            authService,
            declarationService
        );


    const inspectionRepository =
        new InspectionRepository();


    const inspectionService =
        createInspectionService(
            inspectionRepository
        );


    const inspection =
        createInspectionController(
            authService,
            inspectionService
        );


    const reportService =
        createReportService();


    const report =
        createReportController(
            authService,
            reportService
        );


    const aiAnalysisRepository =
        new AIAnalysisRepository();


    const aiAnalysisService =
        createAIAnalysisService(
            aiAnalysisRepository
        );


    const aiAnalysis =
        createAIAnalysisController(
            authService,
            aiAnalysisService
        );


    const synchronizationRepository =
        new SynchronizationRepository();


    const synchronizationService =
        createSynchronizationService(
            synchronizationRepository
        );


    const synchronization =
        createSynchronizationController(
            authService,
            synchronizationService
        );


    return async (
        req,
        res
    ) => {

        res.setHeader(
            "Access-Control-Allow-Origin",
            process.env.CORS_ORIGIN || "*"
        );

        res.setHeader(
            "Access-Control-Allow-Headers",
            "Authorization, Content-Type"
        );

        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, OPTIONS"
        );


        if(
            req.method === "OPTIONS"
        ){

            return res
                .writeHead(204)
                .end();

        }


        try {

            if(
                req.method === "GET" &&
                req.url === "/api/health"
            ){

                return json(
                    res,
                    200,
                    {
                        status:"ok",
                        database:"mongodb"
                    }
                );

            }


            if(
                req.method === "POST" &&
                req.url === "/api/auth/login"
            ){

                return auth.login(
                    req,
                    res,
                    await readBody(req)
                );

            }


            if(
                req.method === "POST" &&
                req.url === "/api/auth/logout"
            ){

                return auth.logout(
                    req,
                    res
                );

            }


            if(
                req.method === "GET" &&
                req.url === "/api/auth/me"
            ){

                return auth.me(
                    req,
                    res
                );

            }


            if(
                req.method === "GET" &&
                req.url === "/api/dashboard"
            ){

                return dashboard.get(
                    req,
                    res
                );

            }


            if(
                req.method === "GET" &&
                req.url === "/api/declarations"
            ){

                return declaration.getAll(
                    req,
                    res
                );

            }


            if(
                req.method === "GET" &&
                req.url.startsWith("/api/declarations/search")
            ){

                const url =
                    new URL(
                        req.url,
                        `http://${req.headers.host}`
                    );


                return declaration.search(
                    req,
                    res,
                    url.searchParams.get("q")
                );

            }


            if(
                req.method === "GET" &&
                req.url.startsWith("/api/declarations/")
            ){

                const id =
                    req.url.split("/")[3];


                return declaration.getById(
                    req,
                    res,
                    id
                );

            }


            if(
                req.method === "GET" &&
                req.url === "/api/inspections"
            ){

                return inspection.getAll(
                    req,
                    res
                );

            }


            if(
                req.method === "GET" &&
                req.url.startsWith("/api/inspections/")
            ){

                const id =
                    req.url.split("/")[3];


                return inspection.getById(
                    req,
                    res,
                    id
                );

            }


            if(
                req.method === "POST" &&
                req.url === "/api/inspections"
            ){

                return inspection.create(
                    req,
                    res,
                    await readBody(req)
                );

            }


            if(
                req.method === "PUT" &&
                req.url.startsWith("/api/inspections/")
            ){

                const id =
                    req.url.split("/")[3];


                return inspection.updateStatus(
                    req,
                    res,
                    id,
                    await readBody(req)
                );

            }


            if(
                req.method === "GET" &&
                req.url === "/api/reports"
            ){

                return report.getAll(
                    req,
                    res
                );

            }


            if(
                req.method === "GET" &&
                req.url.startsWith("/api/reports/")
            ){

                const id =
                    req.url.split("/")[3];


                return report.getById(
                    req,
                    res,
                    id
                );

            }


            if(
                req.method === "POST" &&
                req.url === "/api/reports"
            ){

                return report.create(
                    req,
                    res,
                    await readBody(req)
                );

            }


            if(
                req.method === "GET" &&
                req.url.startsWith("/api/ai-analysis/")
            ){

                const id =
                    req.url.split("/")[3];


                return aiAnalysis.getByDeclaration(
                    req,
                    res,
                    id
                );

            }


            if(
                req.method === "POST" &&
                req.url === "/api/ai-analysis"
            ){

                return aiAnalysis.create(
                    req,
                    res,
                    await readBody(req)
                );

            }


            if(
                req.method === "GET" &&
                req.url === "/api/synchronization/status"
            ){

                return synchronization.getStatus(
                    req,
                    res
                );

            }


            if(
                req.method === "POST" &&
                req.url === "/api/synchronization"
            ){

                return synchronization.synchronize(
                    req,
                    res
                );

            }

            if(
                req.method === "GET" &&
                req.url === "/api/users"
            ){

                return user.getAll(
                    req,
                    res
                );

            }
            return json(
                res,
                404,
                {
                    error:"Route not found."
                }
            );


        } catch(error){

            return json(
                res,
                error.statusCode || 400,
                {
                    error:
                        error.message ||
                        "Unexpected server error."
                }
            );

        }

    };

};