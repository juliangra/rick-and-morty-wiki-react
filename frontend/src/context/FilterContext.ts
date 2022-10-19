import { createContext } from 'react'
import { FilterFormType } from 'src/types/forms'

type FilterContextProps = {
  open: boolean
  setOpen: (open: boolean) => void
  filters?: FilterFormType
  setFilters: (filters: FilterFormType) => void
}

const defaultFilterContext = {
  open: false,
  setOpen: () => {},
  filters: undefined,
  setFilters: () => {}
}

export const FilterContext = createContext<FilterContextProps>(defaultFilterContext)
