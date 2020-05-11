async function request(url, method = 'GET', data) {
  const config = {
    method,
    headers: {'Content-Type': 'application/json'}
  };

  if (method === 'POST' || method === 'PATCH') {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(url, config);

  return await response.json();
};

export class ApiCall {
  static async get(url) {
    try {
      return await request(url);
    } catch (error) {
      throw error;
    }
  }

  static async post(url, data ={}) {
    try {
      return await request(url, 'POST', data);
    } catch (error) {
      throw error;
    }
  }

  static async delete(url) {
    try {
      return await request(url, 'DELETE');
    } catch (error) {
      throw error;
    }
  }

  static async patch(url, data ={}) {
    try {
      return await request(url, 'PATCH', data);
    } catch (error) {
      throw error;
    }
  }
}