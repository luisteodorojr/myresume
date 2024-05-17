import RequestAPI from '../../../Request/RequestAPI.js'

const ColorsService = () => {

    return new Promise((resolve, reject) => {
        RequestAPI('/colors')
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });

};

export default ColorsService;