import { promises as fs } from 'fs';
import path from 'path';

export default class File {

    public static async readAsync(path: string) {
        return await fs.readFile(path, { encoding: 'utf-8' });
    }

    public static async writeAsync(path: string, content: string) {
        await fs.writeFile(path, content);
    }

    public static async getFileList(dir: string) {
        const files = await fs.readdir(dir, { withFileTypes: true });
        const list = new Array<string>();
        
        for (const file of files) {
            if (file.isDirectory())
                list.push(...await this.getFileList(path.join(dir, file.name)));
            else
                list.push(path.join(dir, file.name));
        }

        return list;
    }

    public static async isFile(path: string) {
        return (await fs.lstat(path)).isFile();
    }

    public static async isDirectory(path: string) {
        return (await fs.lstat(path)).isDirectory();
    }

    public static getExtension(filePath: string) {
        return path.extname(filePath);
    }
}