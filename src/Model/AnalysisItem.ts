import Song from "./Song.js";

export default class AnalysisItem {

    private readonly _song : Song;
    private readonly _url : string;

    public get song() {
        return this._song;
    }

    public get url() {
        return this._url;
    }

    public constructor(song : Song, url : string) {
        this._song = song;
        this._url = url;
    }
}
