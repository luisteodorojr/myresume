import RequestAPI from '../../../Request/RequestAPI.js'

const ResumeService = () => {

    return new Promise((resolve, reject) => {
        RequestAPI('/resume')
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });

};

export default ResumeService;