import fetch from 'node-fetch';
import Album from '../Model/Album.js';
import LibraryAnalyzer from './LibraryAnalyzer.js';

export default class MusicBrainzAnalyzer extends LibraryAnalyzer {

    public async getTrackCount(album: Album) {

        const baseUrl = "https://musicbrainz.org/ws/2/release/";
        const limit = 1;
        const albumName = encodeURI(album.name.trim());
        const artistName = encodeURI(album.artist.name.trim());
        const query = `type:album AND release:${albumName} AND artist:${artistName} AND status:Official`;
        const url = `${baseUrl}?query=${query}&limit=${limit}&fmt=json`;
        
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": "Chrome/106.0.0.0" 
            }
        });

        if (!response.ok)
            return 0;

        try {
            const obj = await response.json() as any;
            return obj.releases[0].media[0]["track-count"];
        } catch (e) {
            return 0;
        }
    }
}