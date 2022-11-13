import Artist from "./Artist.js";

export default class Album {
    private readonly _artist: Artist;
    private readonly _name: string;
    
    public get name(): string {
        return this._name;
    }

    public get artist(): Artist {
        return this._artist;
    }

    public constructor(artist: Artist, name: string) {
        this._artist = artist;
        this._name = name;
    }

    public equals(album: Album) {
        return album.artist.equals(this.artist) && album.name === this.name;
    }
}
