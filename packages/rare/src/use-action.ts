import {useEffect, useState} from 'react'
import {ActionReturnType, ActionState} from 'src/Store'

export const useAction = <A extends any[], R>(action: ActionReturnType<A, R>) => {
  const [state, setState] = useState<ActionState>('idle')

  useEffect(() => {
    action.subscribe(setState)

    return () => {
      action.unsubscribe(setState)
    }
  }, [action])

  return [state, action]
}

