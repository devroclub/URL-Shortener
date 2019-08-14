import axios from 'axios';

class UrlController {
    shortener = async (url) => {
        return await axios.post(
            'https://devro.club/api/shortener',
            JSON.stringify({url: url})
        );
    };

}

export default (new UrlController());