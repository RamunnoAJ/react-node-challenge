import cx from 'classnames'

export default function ImageContainer({
  flag,
  country,
  status,
}: {
  flag: string
  country: string
  status: string
}) {
  return (
    <div
      className={cx(
        'flex items-center gap-2 text-xs rounded-full w-fit pr-2 justify-start font-semibold',
        {
          'text-[#BEA27B] bg-[#FFF8EB]': status === 'Pending',
        },
        {
          'text-[#6781AA] bg-[#EAF1FC]': status === 'Active',
        },
        {
          'bg-gray-100 text-gray-700 filter grayscale': status === 'Expired',
        },
      )}>
      <img
        src={flag}
        alt={country}
        className='rounded-full w-6 h-6 object-cover'
      />
      <span>{status}</span>
    </div>
  )
}
