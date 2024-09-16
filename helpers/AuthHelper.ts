import { API } from '../config';

export const handleLogin = (email: String, password: String): Promise<any> => {
    var url = API + "login";
    const loginData = {
      email: email,
      password: password,
    };

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json(); // Successful login
      } else if (response.status === 400) {
        return response.json().then((data) => {
          throw new Error(data.message); // Handle 400 error and extract message from JSON
        });
      } else {
        throw new Error('Unexpected error: ' + response.status);
      }
    })
    .then((data) => {
      console.log("message = " + data.message + " and token = " + data.token);
      return data; // Return the data for further processing
    })
    .catch((error) => {
      console.log(error);
      throw error; // Propagate the error to be handled where handleLogin is called
    });
};
