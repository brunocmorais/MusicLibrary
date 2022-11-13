import Album from "./Album.js";

export default class Song {
    
    private readonly _album: Album;
    private readonly _title: string;
    private readonly _track: number;
    private readonly _duration: number;
    private readonly _path: string;

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

    public constructor(album: Album, title: string, track: number,
        duration: number, path: string) {
        this._album = album;
        this._title = title;
        this._track = track; 
        this._duration = duration;
        this._path = path;
    }

    public equals(song: Song) {
        return song.album.equals(this.album) &&
               song.title === this.title &&
               song.track === this.track &&
               song.duration === this.duration &&
               song.path === this.path;
    }
}

