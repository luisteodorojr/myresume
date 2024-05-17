import RequestAPI from '../../../Request/RequestAPI.js'

const HeaderService = () => {

    return new Promise((resolve, reject) => {
        RequestAPI('/header')
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });

};

export default HeaderService;