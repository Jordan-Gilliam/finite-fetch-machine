import { Machine, assign } from 'xstate'
import { FetchContext, FetchStateSchema, FetchEvent } from './types'

const fetchMachine = Machine<FetchContext, FetchStateSchema, FetchEvent>({
  id: 'fetch',
  initial: 'idle',
  context: {
    retries: 0
  },
  states: {
    idle: {
      on: {
        FETCH: 'loading'
      }
    },
    loading: {
      on: {
        RESOLVE: 'success',
        REJECT: 'failure'
      }
    },
    success: {
      type: 'final'
    },
    failure: {
      on: {
        RETRY: {
          target: 'loading',
          actions: assign({
            retries: (context: FetchContext, _event: FetchEvent) =>
              context.retries + 1
          })
        }
      }
    }
  }
})

export default fetchMachine
