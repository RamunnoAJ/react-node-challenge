export default function ProgressBar({
  from,
  to,
}: {
  from: number
  to: number
}) {
  const percentage = (from / to) * 100

  const borderWidth = 5

  const radius = 50 - borderWidth / 2
  const circumference = 2 * Math.PI * radius

  const strokeDasharray = circumference
  const strokeDashoffset = circumference * ((100 - percentage) / 100)

  return (
    <svg className='w-28 h-28'>
      <circle
        className='text-gray-600'
        strokeWidth={1}
        strokeLinecap='round'
        stroke='#292B2E'
        fill='transparent'
        r={radius}
        cx='50%'
        cy='50%'
      />
      <circle
        className='text-blue-500'
        strokeWidth={borderWidth}
        strokeLinecap='round'
        fill='transparent'
        stroke='#292B2E'
        r={radius}
        cx='50%'
        cy='50%'
        style={{
          strokeDasharray,
          strokeDashoffset,
          transform: 'rotate(-90deg)',
          transformOrigin: 'center',
        }}
      />
      <text
        x='50%'
        y='50%'
        dominantBaseline='middle'
        textAnchor='middle'
        fontSize={16}
        className='flex flex-col items-center justify-center'>
        <tspan x='50%' dy='-0.5em' className='text-slate-900'>
          {from}
        </tspan>
        <tspan x='50%' dy='1.5em' className='text-slate-500 text-xs'>
          / {to} GB
        </tspan>
      </text>
    </svg>
  )
}
