import Album from "./Album.js";

export default class Song {
    
    private readonly _album: Album;
    private readonly _title: string;
    private readonly _track: number;
    private readonly _duration: number;
    private readonly _path: string;
    private readonly _isrc: string;

    public get album(): Album {
        return this._album;
    }
    
    public get title(): string {
        return this._title;
    }
    
    public get track(): number {
        return this._track;
    }

    public get duration() : number {
        return this._duration;
    }

    public get path() : string {
        return this._path;
    }

    public get isrc() : string {
        return this._isrc;
    }

    public constructor(album: Album, title: string, track: number,
        duration: number, path: string, isrc: string) {
        this._album = album;
        this._title = title;
        this._track = track; 
        this._duration = duration;
        this._path = path;
        this._isrc = isrc;
    }

    public equals(song: Song) {
        return song.album.equals(this.album) &&
               song.title === this.title &&
               song.track === this.track &&
               song.duration === this.duration &&
               song.path === this.path &&
               song.isrc === this.isrc;
    }
}

