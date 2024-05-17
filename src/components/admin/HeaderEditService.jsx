import RequestAPI from '../../Request/RequestAPI.js';

const HeaderEditService = (data) => {
    return new Promise((resolve, reject) => {
        RequestAPI('/headeredit', 'POST', data)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
};

export default HeaderEditService;