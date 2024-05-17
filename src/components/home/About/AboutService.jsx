import RequestAPI from '../../../Request/RequestAPI.js'

const AboutService = () => {

    return new Promise((resolve, reject) => {
        RequestAPI('/about')
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });

};

export default AboutService;