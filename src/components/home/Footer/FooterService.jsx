import RequestAPI from '../../../Request/RequestAPI.js'

const FooterService = () => {

    return new Promise((resolve, reject) => {
        RequestAPI('/footer')
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });

};

export default FooterService;