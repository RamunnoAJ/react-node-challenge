import React from 'react'

type Props = {
  className?: string
  children: React.ReactNode
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function Form({
  className,
  children,
  onSubmit = () => {},
  onChange = () => {},
  ...props
}: Props) {
  return (
    <form
      className={className}
      onSubmit={onSubmit}
      onChange={onChange}
      {...props}>
      {children}
    </form>
  )
}
