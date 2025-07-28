export default function navigatorPermission(type = "") {
    return new Promise((resolve, reject) => {
        navigator.permissions
            .query({ name: type })
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
