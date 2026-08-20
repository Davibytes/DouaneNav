export const ROLES = Object.freeze({
    ADMINISTRATOR: "Administrator",
    CUSTOMS_OFFICER: "Customs Officer",
    SUPERVISOR: "Supervisor"
});


export const ROLE_PERMISSIONS = Object.freeze({

    [ROLES.ADMINISTRATOR]: [
        "users:manage",
        "declarations:read",
        "inspections:read",
        "synchronization:read",
        "reports:read"
    ],

    [ROLES.CUSTOMS_OFFICER]: [
        "declarations:read",
        "documents:write",
        "inspections:write",
        "reports:write"
    ],

    [ROLES.SUPERVISOR]: [
        "declarations:read",
        "inspections:read",
        "reports:read",
        "synchronization:read",
        "statistics:read"
    ]

});