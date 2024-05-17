const BASE_URL = 'https://luisteodorojr.pythonanywhere.com';

const RequestAPI = async (path, method = 'GET', data = null) => {
    const url = `${BASE_URL}/${path}`; 
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    if (data) {
      options.body = JSON.stringify(data);
    }
  
    try {
      const response = await fetch(url, options);
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw new Error('Erro na requisição.');
    }
};

export default RequestAPI;