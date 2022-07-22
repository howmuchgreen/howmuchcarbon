export interface DataProvider<T> {
  getAll(): T[];
}
