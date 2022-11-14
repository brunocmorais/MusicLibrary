import * as ytMusic from 'node-youtube-music';
import Album from '../Model/Album.js';
import ISearcher from './ISearcher.js';

export default class YouTubeSearcher implements ISearcher {

    public async search(album: Album) {

        const albums = await ytMusic.searchAlbums(album.name + " - " + album.artist.name);
    
        if (albums.length == 0)
            return;

        return "https://music.youtube.com/browse/" + albums[0].albumId;
    }
}

