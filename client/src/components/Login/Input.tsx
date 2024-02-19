import cx from 'classnames'

type Props = {
  label: string
  type: string
  name: string
  isRequired?: boolean
  placeholder?: string
}

export default function Input({
  label,
  type,
  name,
  isRequired,
  placeholder,
}: Props) {
  const isPassword = type === 'password'

  return (
    <div>
      <label
        htmlFor={name}
        className='block mb-2 text-sm font-medium text-gray-900'>
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        id={name}
        required={isRequired}
        className={cx(
          'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-300 focus:outline-none block w-full p-2.5',
          {
            'placeholder:translate-y-1': isPassword,
          },
        )}
      />
    </div>
  )
}
