
export default class Artist {
    private readonly _name: string;
    
    public get name(): string {
        return this._name;
    }
    
    public constructor(name: string) {
        this._name = name;
    }

    public equals(artist: Artist) {
        return artist.name === this.name;
    }
}
