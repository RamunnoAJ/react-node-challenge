import { Card } from '@/stores/useCardsStore'
import { convertKBToGB } from '@/utils/convertKBtoGB'
import ProgressBar from './ProgressBar'
import ButtonContainer from './ButtonContainer'
import ImageContainer from './ImageContainer'
import Calendar from './Calendar'

export default function EsimCard({
  country,
  flag,
  plan,
  status,
  dateEnd,
  dateStart,
  comsuption,
}: Card) {
  const totalComsuption = convertKBToGB(comsuption?.totalComsumption as number)
  const totalCapacityInGB = Number(plan.split(' ')[2].replace('GB', ''))

  return (
    <article className='flex flex-col justify-between gap-2 p-6 border border-gray-200 rounded-lg w-full max-w-[320px] h-[270px]'>
      <div className='flex justify-between gap-2'>
        <div className='flex flex-col gap-2'>
          <ImageContainer flag={flag} country={country} status={status} />
          <h1 className='font-semibold'>{country}</h1>
          {status !== 'Expired' ? (
            <p className='text-sm text-gray-800'>{plan}</p>
          ) : (
            <div>
              <p className='text-sm text-gray-800'>
                {dateStart} - {dateEnd}
              </p>
              <p className='text-xs text-gray-600'>{plan}</p>
            </div>
          )}
        </div>
        <div className='text-sm text-gray-800'>
          {status === 'Active' && (
            <ProgressBar from={totalComsuption} to={totalCapacityInGB} />
          )}
          {status === 'Pending' && (
            <Calendar fromDate={dateStart} days={plan.split(' ')[0]} />
          )}
        </div>
      </div>
      <ButtonContainer status={status} />
    </article>
  )
}
