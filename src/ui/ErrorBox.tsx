export default function ErrorBox({ message }: { message: string }) {
  return (
    <p className="border-2 border-red-400 py-4 px-4 text-sm font-semibold capitalize text-red-600 bg-white-v rounded mb-6">
      {message}
    </p>
  );
}
