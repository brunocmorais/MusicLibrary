export default interface IFileBuilder<T> {
    build(source : T) : Promise<string>;
}