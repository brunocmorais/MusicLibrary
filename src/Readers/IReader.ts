export default interface IReader<T> {
    read(source: string) : Promise<T>;
}