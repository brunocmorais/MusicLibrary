export default interface IBuilder<T> {
    build(source : T) : Promise<string>;
}