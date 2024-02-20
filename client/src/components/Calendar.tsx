import { getDays } from '@/utils/getDays'

export default function Calendar({
  fill,
  stroke,
  fromDate,
  days,
}: {
  fill?: string
  stroke?: string
  fromDate: string
  days: string
}) {
  const daysPassed = getDays(fromDate)

  return (
    <svg fill={fill || '#fff'} className='w-28 h-28' viewBox='0 0 28 28'>
      <g>
        <path
          d='M14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C20.1752 21.4816 19.3001 21.7706 18 21.8985'
          stroke={stroke || '#292B2E'}
          strokeWidth='1'
          strokeLinecap='round'></path>
        <path
          d='M7 4V2.5'
          stroke={stroke || '#292B2E'}
          strokeWidth='1'
          strokeLinecap='round'></path>
        <path
          d='M17 4V2.5'
          stroke={stroke || '#292B2E'}
          strokeWidth='1'
          strokeLinecap='round'></path>
        <path
          d='M21.5 9H16.625H10.75M2 9H5.875'
          stroke={stroke || '#292B2E'}
          strokeWidth='1'
          strokeLinecap='round'></path>
      </g>
      <text
        x='50%'
        y='50%'
        dominantBaseline='middle'
        textAnchor='middle'
        fill={fill || '#292B2E'}
        fontSize={4}
        className='flex flex-col items-center justify-center'>
        <tspan x='40%' className='text-slate-900'>
          {daysPassed > Number(days) ? days : daysPassed}
        </tspan>
        <tspan x='40%' dy='1.5em' className='text-slate-500 text-[3px]'>
          / {days} {days !== '1' ? 'días' : 'día'}
        </tspan>
      </text>
    </svg>
  )
}
