import axios from 'axios';

class UrlController {
    shortener = async (url) => {
        return await axios.post(
            'http://dc/api/shortener',
            JSON.stringify({url: url}),
            {headers: {'Content-Type': 'multipart/form-data'}}
        );
    };

}

export default (new UrlController());