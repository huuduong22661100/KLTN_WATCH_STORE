import * as React from "react"

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={className} {...props} />
  )
)
Card.displayName = "Card"

export const CardHeader = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props}>{children}</div>
)
export const CardContent = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props}>{children}</div>
)
export const CardTitle = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className="text-2xl font-semibold leading-none tracking-tight" {...props}>{children}</h3>
)

export const CardDescription = ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className="text-sm text-muted-foreground" {...props}>{children}</p>
)

export const CardFooter = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props}>{children}</div>
)