import axios from 'axios';

export default axios.create({

    baseURL: "https://60c173174f7e880017dbf9b3.mockapi.io/",
    headers:{
        "Content-type": "application/json"
    }

})