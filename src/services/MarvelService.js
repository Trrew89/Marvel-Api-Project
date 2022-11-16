

class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = "apikey=702187f003ae05993df1acedf373fc49";

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok){
            throw new Error(`Could not fetch ${url}, statur: ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = async () => {
        const res= await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    return res.data.results.map(this._transormCharacter);
    }


    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    return this._transormCharacter(res.data.results[0]);
    }

    _transormCharacter = (char) => {
        return {
            name: char.name,
            desription: char.desription ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' +char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService;

