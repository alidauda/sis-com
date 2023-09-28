export function StatusState(status: string) {
  switch (status) {
    case 'PENDING':
      return (
        <div>
          <span className='px-2 py-1 text-xs text-yellow-600 bg-yellow-200 rounded-full'>
            {status}
          </span>
        </div>
      );
    case 'COMPLETED':
      return (
        <div>
          <span className='px-2 py-1 text-xs text-green-600 bg-green-200 rounded-full'>
            {status}
          </span>
        </div>
      );
    case 'CANCELLED':
      return (
        <div>
          <span className='px-2 py-1 text-xs text-red-600 bg-red-200 rounded-full'>
            {status}
          </span>
        </div>
      );
    case 'REJECTED':
      return (
        <div>
          <span className='px-2 py-1 text-xs text-red-600 bg-red-200 rounded-full'>
            {status}
          </span>
        </div>
      );
    default:
      return (
        <div>
          <span className='px-2 py-1 text-xs text-yellow-600 bg-yellow-200 rounded-full'>
            {status}
          </span>
        </div>
      );
  }
}
