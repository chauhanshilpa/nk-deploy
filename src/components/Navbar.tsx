import { useNavigate } from "react-router-dom";
interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Navbar = ({ setCurrentPage }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex top-0 sticky items-center p-5 shadow-md shadow-[#4A7B43] h-14 bg-gray-50"
      style={{
        backgroundImage:
          "url(https://note-keeper.s3.eu-north-1.amazonaws.com/note-keeper-icons/navbar-bg.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        backgroundPosition: "right",
      }}
    >
      <div
        className="flex items-center gap-2 italic text-lg"
        onClick={() => {
          navigate("/");
          setCurrentPage(0);
        }}
      >
        <img
          src="https://note-keeper.s3.eu-north-1.amazonaws.com/note-keeper-icons/fabicon.png"
          alt="note-keeper-icon"
          className="h-10 w-10 cursor-pointer hover:scale-105"
        />
        <span className="font-bold text-gray-50">Notes Keeper</span>
      </div>
    </div>
  );
};

export default Navbar;
