import { createContext } from 'react'
import { createContextualCan } from '@casl/react'

export const UserAccessContext = createContext()
export const Can = createContextualCan(UserAccessContext.Consumer)
