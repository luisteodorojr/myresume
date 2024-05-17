import RequestAPI from '../../../Request/RequestAPI.js'

const SkillsService = () => {

    return new Promise((resolve, reject) => {
        RequestAPI('/skills')
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });

};

export default SkillsService;