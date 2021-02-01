export const promisify = (function_) => (...args: any[]) => {
  return new Promise((resolve, reject) => {
    function_(...args, (error, result) => (error ? reject(error) : resolve(result)))
  })
}

