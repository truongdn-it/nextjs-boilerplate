/* eslint-disable no-unused-vars */
import { cva, type VariantProps } from 'class-variance-authority'

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export { BadgeProps }
