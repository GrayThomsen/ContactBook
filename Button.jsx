export default function Button({ onClick }) {
  return (
    <button
      type="button"
      title="Tilføj kontakt"
      onClick={onClick}
      className="fixed right-5 bottom-5 h-14 w-14 rounded-full bg-[#0A66C2] text-white text-3xl leading-[3.5rem] shadow-lg hover:bg-[#004182] transition"
    >
      +
    </button>
  );
}
