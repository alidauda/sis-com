export default function Customer({
  firstValue,
  secondValue,
  thirdValue,
  fourthValue,
}: {
  firstValue: string;
  secondValue: string;
  thirdValue: string;
  fourthValue: string;
}) {
  return (
    <div className='flex justify-between gap-3 content-start'>
      <div>
        <div>{firstValue}</div>
        <div>{secondValue}</div>
      </div>
      <div className='flex flex-col justify-start items-start bg-emerald-600 gap-3'>
        <div>{thirdValue}</div>
        <div>{fourthValue}</div>
      </div>
    </div>
  );
}
