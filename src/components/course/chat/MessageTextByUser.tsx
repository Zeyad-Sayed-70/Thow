export default function MessageTextByUser() {
  return (
    <>
      <div className="bg-blue-dark-4 p-4 rounded-lg">
        <div className="flex gap-4 ">
          <div className="text-lg font-semibold">Me:</div>
          <p className="text-lg whitespace-pre-wrap max-w-full">Yes, I am</p>
        </div>
      </div>
    </>
  );
}
