export type UtilMakeOptional<T> = {
  [K in keyof T]+?: T[K];
};
