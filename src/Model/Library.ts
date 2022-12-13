import Album from "./Album.js";
import Artist from "./Artist.js";
import Song from "./Song.js";

export default class Library {

    private _songs = new Array<Song>();

    public get songs() {
        return this._songs;
    }

    public getSongs(album : Album) {
        return this.songs.filter(song => song.album == album);
    }

    public get albums() {
        const albums = new Array<Album>();

        for (let song of this.songs)
            if (albums.filter(a => a.equals(song.album)).length == 0)
                albums.push(song.album);

        return albums;
    }

    public get artists() {
        const artists = new Array<Artist>();

        for (const song of this.songs)
            if (artists.filter(a => a.equals(song.album.artist)).length == 0)
                artists.push(song.album.artist);

        return artists;
    }

    public add(song: Song) {
        this.songs.push(song);
    }

    public remove(song: Song) {
        const index = this.songs.findIndex(x => x.equals(song));

        if (index >= 0)
            this.songs.splice(index, 1);
    }
}