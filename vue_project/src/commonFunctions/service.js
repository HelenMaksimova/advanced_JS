export const service = function (url, method, data) {
    const initData = {method: method};
    if (data) {
        initData.body = data;
    }
    if (method === 'PATCH' || method === 'DELETE') {
        initData.headers = {'Content-type': 'application/json'}
    }
    return fetch(url, {...initData})
        .then((response) => {
            return response.json()
        })
}
