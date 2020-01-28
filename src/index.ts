import { Machine, assign } from 'xstate'

// The hierarchical (recursive) schema for the states
interface FetchStateSchema {
  states: {
    idle: {}
    loading: {}
    success: {}
    failure: {}
  }
}

// The events that the machine handles
type FetchEvent =
  | { type: 'FETCH' }
  | { type: 'RESOLVE' }
  | { type: 'REJECT' }
  | { type: 'RETRY' }

// The context (extended state) of the machine
interface FetchContext {
  retries: number
}

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
