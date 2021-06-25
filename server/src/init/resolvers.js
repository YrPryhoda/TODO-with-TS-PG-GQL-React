import { queries as customersQueries } from "../bus/customers/gql/queries"
import { queries as tasksQueries } from "../bus/tasks/gql/queries"

import { mutations as tasksMutations } from "../bus/tasks/gql/mutations"
import { mutations as customerMutations } from "../bus/customers/gql/mutations";

import { subscriptions as tasksSubscriptions } from "../bus/tasks/gql/subscriptions"

export const resolvers = {
  Query: {
    ...customersQueries,
    ...tasksQueries
  },

  Mutation: {
    ...customerMutations,
    ...tasksMutations
  },
  Subscription: {
    ...tasksSubscriptions
  }
}