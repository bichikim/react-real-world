import {useRef} from 'react'

export const useInit = (initValue) => {
  const init = useRef(initValue)
  return init.current
}
