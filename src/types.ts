// The hierarchical (recursive) schema for the states
export interface FetchStateSchema {
  states: {
    idle: {}
    loading: {}
    success: {}
    failure: {}
  }
}

// The events that the machine handles
export type FetchEvent =
  | { type: 'FETCH' }
  | { type: 'RESOLVE' }
  | { type: 'REJECT' }
  | { type: 'RETRY' }

// The context (extended state) of the machine
export interface FetchContext {
  retries: number
}
