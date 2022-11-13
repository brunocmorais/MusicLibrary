import Album from "./Album.js";
import Artist from "./Artist.js";
import Song from "./Song.js";

export default class Library {

    private _songs = new Array<Song>();

    public get songs() {
        return this._songs;
    }

    public get albums() {
        const albums = new Array<Album>();

        for (let song of this._songs)
            if (albums.filter(a => a.equals(song.album)).length == 0)
                albums.push(song.album);

        return albums;
    }

    public get artists() {
        const artists = new Array<Artist>();

        for (const song of this._songs)
            if (artists.filter(a => a.equals(song.album.artist)).length == 0)
                artists.push(song.album.artist);

        return artists;
    }

    public add(song: Song) {
        this._songs.push(song);
    }

    public remove(song: Song) {
        const index = this._songs.findIndex(x => x.equals(song));

        if (index >= 0)
            this._songs.splice(index, 1);
    }
}