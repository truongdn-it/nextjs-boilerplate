/* eslint-disable no-unused-vars */
interface TaskColumns {
  id: string
  title: string
  status: string
  label: string
  priority: string
}

interface DataTableFacetedFilter<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
    icon?: LucideIcon
  }[]
}
