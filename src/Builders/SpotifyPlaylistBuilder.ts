import fetch from "node-fetch";
import Album from "../Model/Album.js";
import IBuilder from "./IBuilder.js";

export default class SpotifyPlaylistBuilder implements IBuilder<Album[]> {

    private readonly _token : string;
    private readonly _playlistId : string;

    constructor(token: string, playlistId : string) {
        this._token = token;
        this._playlistId = playlistId;
    }

    public async build(albums: Album[]) {

        for (const album of albums) {

            try {
                const albumId = await this.getAlbumId(album);
                const tracks = await this.getTracksFromAlbum(albumId);
                await this.addTracksToPlaylist(this._playlistId, tracks);
            } catch (e) {
                console.log(`Could not add album ${album.name}: ${e.message}`);
            }
        }

        return "";
    }

    private async getAlbumId(album : Album) {

        const requestData = this.getRequestData("GET");

        const params = {
            'q': `artist:${album.artist.name} album: ${album.name}`,
            'type': 'album'
        };

        const response = await fetch('https://api.spotify.com/v1/search?' + 
            this.getEncodedParams(params), requestData);

        if (response.ok) {
            const json = await response.json() as any;

            if (json.albums?.items?.length > 0) 
                return json.albums.items[0].id;
        }
    }

    private async getTracksFromAlbum(albumId : string) : Promise<string[]> {

        const requestData = this.getRequestData("GET");

        const response = await fetch('https://api.spotify.com/v1/albums/' + albumId + '/tracks/', requestData);

        if (response.ok) {
            const json = await response.json() as any;
            
            if (json.items.length > 0) 
                return json.items.map(i => i.id);
        }
    }

    private async addTracksToPlaylist(playlistId: string, trackIds: string[]) {

        const requestData = this.getRequestData("POST");

        const params = {
            'uris': trackIds.map(t => `spotify:track:${t}`).join(",")
        };

        const response = await fetch('https://api.spotify.com/v1/playlists/' + playlistId + '/tracks?' + 
            this.getEncodedParams(params), requestData);

        const text = await response.text();

        return response.ok;
    }

    private getRequestData(method: string) {
        
        return {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this._token
            }
        };
    }

    private getEncodedParams(obj: string | Record<string, string> | string[][] | URLSearchParams) {
        return new URLSearchParams(obj).toString();
    }
}