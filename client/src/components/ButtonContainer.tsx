export default function ButtonContainer({ status }: { status: string }) {
  return (
    <div className='flex flex-col w-full gap-2 text-sm font-medium'>
      {status === 'Active' && (
        <>
          <button className='w-full border border-gray-200 rounded-md p-2'>
            Ver detalles
          </button>
          <button className='w-full bg-[#48EC86] rounded-md text-black p-2'>
            Añadir más datos
          </button>
        </>
      )}
      {status === 'Pending' && (
        <button className='w-full rounded-md p-2 bg-[#CC0F50] text-white'>
          Ver detalles e instalar
        </button>
      )}
    </div>
  )
}
