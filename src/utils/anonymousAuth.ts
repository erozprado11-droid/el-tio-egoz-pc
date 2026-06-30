export const getAnonymousUserId = (): string => {
    const KEY = "egoz_anonymous_uid";
    let uid = localStorage.getItem(KEY);

    if (!uid) {
        // Añadimos un timestamp para asegurar unicidad absoluta en el tiempo
        uid = "anon_" + Date.now().toString(36) + Math.random().toString(36).substring(2);
        localStorage.setItem(KEY, uid);
    }
    return uid;
};