const AUTH_ROUTES = {
    login: "/auth/login",
    register: "/auth/register"
}

const GROUP_ROUTES = {
    base: "/study-groups",
    generate: "/study-groups/generate",
}

const TEACHER_ROUTES = {
    base: "/teachers",
    groups: "/teachers/study-groups"
}

export const API_ROUTES = {
    auth: AUTH_ROUTES,
    groups: GROUP_ROUTES,
    teachers: TEACHER_ROUTES,
    students: "/students",
    time_slots: "/time-slots",

}