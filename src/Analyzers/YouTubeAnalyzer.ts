import * as ytMusic from 'node-youtube-music';
import Album from "../Model/Album.js";
import LibraryAnalyzer from "./LibraryAnalyzer.js";

export default class YouTubeAnalyzer extends LibraryAnalyzer {

    public async getTrackCount(album: Album) {
        
        const albums = await ytMusic.searchAlbums(album.name + " - " + album.artist.name);

        if (albums.length == 0)
            return 0;

        const music = await ytMusic.listMusicsFromAlbum(albums[0].albumId);
        return music.length;
    }
}