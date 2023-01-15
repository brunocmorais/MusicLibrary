import * as ytMusic from 'node-youtube-music';
import Album from '../Model/Album.js';
import Song from '../Model/Song.js';
import ISearcher from './ISearcher.js';

export default class YouTubeSearcher implements ISearcher {

    public async searchAlbum(album: Album) {

        const albums = await ytMusic.searchAlbums(`${album.name} - ${album.artist.name}`);
    
        if (albums.length == 0)
            return "";

        return "https://music.youtube.com/browse/" + albums[0].albumId;
    }

    public async searchSong(song: Song) {

        const music = await ytMusic.searchMusics(`${song.title} - ${song.album.name} - ${song.album.artist.name}`);
    
        if (music.length == 0)
            return "";

        return "https://music.youtube.com/watch/?v=" + music[0].youtubeId;
    }
}

