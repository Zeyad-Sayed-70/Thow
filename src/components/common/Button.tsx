import Link from "next/link";

export default function Button({
  btnText,
  bg_color,
  textColor,
  bg_hover_color,
  targetLink,
}: {
  btnText: string;
  bg_color: string;
  textColor: string;
  bg_hover_color: string;
  targetLink: string;
}) {
  return (
    <Link href={targetLink}>
      <button
        className={`${bg_color} ${
          "hover:" + bg_hover_color
        } ${textColor} text-md font-semibold rounded-lg py-2 px-4`}
      >
        {btnText}
      </button>
    </Link>
  );
}
