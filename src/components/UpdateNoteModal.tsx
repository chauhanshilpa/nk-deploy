import { RxUpdate } from "react-icons/rx";
import { Tooltip } from "react-tooltip";
import { motion } from "framer-motion";
interface Props {
  noteId: string;
  noteBgImageSrc: string;
  noteBgColor: string;
  noteTitle: string;
  setNoteTitle: React.Dispatch<React.SetStateAction<string>>;
  noteTagline: string;
  setNoteTagline: React.Dispatch<React.SetStateAction<string>>;
  noteBody: string;
  setNoteBody: React.Dispatch<React.SetStateAction<string>>;
  setIsUpdateNoteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateNoteCard: () => Promise<void>;
}

const UpdateNoteModal = ({
  noteId,
  noteBgImageSrc,
  noteBgColor,
  noteTitle,
  setNoteTitle,
  noteTagline,
  setNoteTagline,
  noteBody,
  setNoteBody,
  setIsUpdateNoteModalOpen,
  handleUpdateNoteCard,
}: Props) => {
  return (
    <motion.div
      layoutId={noteId}
      className="fixed inset-0 flex items-center justify-center z-50 mt-20"
    >
      <div
        className="flex flex-col justify-center bg-gray-50 border shadow p-5 rounded-xl md:w-[40%] xs:w-[90%] relative"
        style={{
          backgroundColor: noteBgColor !== "" ? `#${noteBgColor}` : "",
          backgroundImage:
            noteBgImageSrc !== "" ? `url(${noteBgImageSrc})` : "",
          backgroundSize: noteBgImageSrc !== "" ? "cover" : "",
          backgroundRepeat: noteBgImageSrc !== "" ? "repeat" : "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <img
          src="https://note-keeper.s3.eu-north-1.amazonaws.com/note-keeper-icons/cancel.png"
          alt="cancel"
          className="h-5 w-5 cursor-pointer self-end hover:scale-125"
          onClick={() => setIsUpdateNoteModalOpen(false)}
          data-tooltip-id="cancel"
          data-tooltip-content="Cancel"
        />
        <div className="relative z-0 w-full mb-5 group h-[20%]">
          <input
            type="text"
            name="title"
            className="py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent appearance-none focus:outline-none focus:ring-0 peer font-bold"
            placeholder={noteTitle ? noteTitle : "Title"}
            required
            value={noteTitle}
            onChange={(event) => setNoteTitle(event?.target.value)}
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="tagline"
            className="py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent focus:outline-none focus:ring-0 peer font-semibold"
            placeholder={noteTagline ? noteTagline : "Tagline"}
            value={noteTagline}
            onChange={(event) => setNoteTagline(event?.target.value)}
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="body"
            className="py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent focus:outline-none focus:ring-0 peer"
            placeholder={noteBody ? noteBody : "body"}
            required
            value={noteBody}
            onChange={(event) => setNoteBody(event?.target.value)}
          />
        </div>
        <div className="flex">
          <button
            type="button"
            className="flex items-center text-white bg-blue-500 hover:bg-blue-600  focus:ring-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none border-transparent focus:ring-1"
            onClick={handleUpdateNoteCard}
          >
            <span>
              <RxUpdate className="text-lg mr-2" />
            </span>
            <span>Update</span>
          </button>
        </div>
      </div>
      <Tooltip id="cancel" className="tooltip" />
    </motion.div>
  );
};

export default UpdateNoteModal;
