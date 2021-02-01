export const resolveEsModule = <T>(module: any): T => {
  return  module.default ?? module
}
