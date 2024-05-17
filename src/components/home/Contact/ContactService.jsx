import RequestAPI from '../../../Request/RequestAPI.js'

const ContactService = () => {

    return new Promise((resolve, reject) => {
        RequestAPI('/contact')
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });

};

export default ContactService;