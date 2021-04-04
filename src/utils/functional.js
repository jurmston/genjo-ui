export const pipe = (f, g) => (...args) => g(f(...args))

export function compose(...functions) {
  return functions.reduceRight(pipe)
}
