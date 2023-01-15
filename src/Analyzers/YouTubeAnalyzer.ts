import * as ytMusic from 'node-youtube-music';
import Album from "../Model/Album.js";
import Song from '../Model/Song.js';
import YouTubeSearcher from '../Searchers/YouTubeSearcher.js';
import AlbumAnalyzer from "./LibraryAnalyzer.js";

export default class YouTubeAnalyzer extends AlbumAnalyzer {

    public async getMissingSongs(album: Album, currentSongs: Song[]) : Promise<Song[]> {
        
        const missingSongs = new Array<Song>();
        let query = `${album.artist.name} - ${album.name}`;

        if (album.name === album.artist.name) 
            query += " self titled";
            
        const albums = await ytMusic.searchAlbums(query);

        if (albums.length == 0)
            return missingSongs;

        const musics = await ytMusic.listMusicsFromAlbum(albums[0].albumId ?? "");
        const unwanted = ["(live", "live)", "(live)", "(demo", "demo)", "(demo)"];

        for (const music of musics) {

            let musicName = music.title ?? "";

            if (unwanted.some(x => musicName.toLowerCase().indexOf(x) >= 0))
                continue;

            musicName = this.sanitizeMusicName(musicName);

            if (!currentSongs.some(song => musicName == this.sanitizeMusicName(song.title))) {
                const missingSong = new Song(album, music.title ?? "", 0, 
                    music.duration?.totalSeconds ?? 0, `https://music.youtube.com/watch/?v=${music.youtubeId}`, "");

                missingSongs.push(missingSong);
            }
        }

        return missingSongs;
    }

    private sanitizeMusicName(music : string) {
        let musicName = music.toLowerCase().trim();

        if (musicName.indexOf("(") >= 0 || musicName.indexOf(")") >= 0)
            musicName = musicName.substring(0, musicName.indexOf("(") - 1);

        return musicName.replace(/[^A-Za-z0-9\s]/g, "");
    }

    public async searchSongUrl(song: Song): Promise<string> {
        const searcher = new YouTubeSearcher();
        return await searcher.searchSong(song);
    }
}