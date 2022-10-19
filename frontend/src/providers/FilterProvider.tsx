import React, { useState } from 'react'
import { FilterContext } from 'src/context/FilterContext'
import { FilterFormType } from 'src/types/forms'

interface FilterProviderProps {
  children: React.ReactNode
}

const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState<FilterFormType>()

  return (
    <FilterContext.Provider value={{ open, setOpen, filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  )
}

export default FilterProvider
