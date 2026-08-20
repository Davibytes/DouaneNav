const canSeeOperationalData = new Set([
    "Administrator",
    "Customs Officer",
    "Supervisor"
]);


export const createDashboardService = (repository) => ({

    async getDashboard(user) {

        if (!canSeeOperationalData.has(user.role)) {

            throw Object.assign(
                new Error(
                    "You are not authorized to view the dashboard."
                ),
                {
                    statusCode: 403
                }
            );

        }


        const data =
            await repository.getDashboardData();


        const today =
            new Date()
                .toISOString()
                .slice(0, 10);


        const allInspections =
            data.inspections || [];


        const visibleRecent =
            [...allInspections]
                .sort(
                    (a, b) =>
                        new Date(b.createdAt) -
                        new Date(a.createdAt)
                )
                .slice(0, 5);


        const counts = {

            todayDeclarations:
                (data.declarations || []).filter(
                    (item) =>
                        item.createdAt &&
                        item.createdAt
                            .toISOString()
                            .startsWith(today)
                ).length,


            pendingInspections:
                allInspections.filter(
                    (item) =>
                        item.status === "Pending" ||
                        item.status === "In Progress"
                ).length,


            completedInspections:
                allInspections.filter(
                    (item) =>
                        item.status === "Completed" ||
                        item.status === "submitted" ||
                        item.status === "synced"
                ).length,


            pendingSynchronizations:
                (data.synchronizationLogs || []).filter(
                    (item) =>
                        item.status === "pending" ||
                        item.status === "processing"
                ).length,


            activeAlerts:
                (data.alerts || []).filter(
                    (item) =>
                        item.status === "active"
                ).length

        };


        if (user.role === "Administrator") {

            counts.activeUsers =
                data.activeUserCount;

        }


        return {

            generatedAt:
                new Date().toISOString(),


            scope:
                user.role,


            counts,


            alerts:
                (data.alerts || [])
                    .filter(
                        (item) =>
                            item.status === "active"
                    )
                    .slice(0, 4),


            recentInspections:
                visibleRecent,


            synchronization:
                (data.synchronizationLogs || [])
                    .sort(
                        (a, b) =>
                            new Date(
                                b.attemptedAt ||
                                b.createdAt
                            ) -
                            new Date(
                                a.attemptedAt ||
                                a.createdAt
                            )
                    )
                    .slice(0, 4)

        };

    }

});