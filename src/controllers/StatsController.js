import axios from 'axios';

class StatsController {
    recent = async () => {
        return await axios.get(
            'http://dc/api/shortener/stats?order=recent'
        );
    };

    mostClicked = async () => {
        return await axios.get(
            'http://dc/api/shortener/stats?order=clicks'
        );
    };

}

export default (new StatsController());