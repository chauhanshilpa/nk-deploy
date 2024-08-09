import { useRef, useEffect } from "react";
import { VscPinned } from "react-icons/vsc";
import { TbPinnedFilled } from "react-icons/tb";
import { Note } from "../utils/classModels";
import {
  changeBackground,
  deleteNote,
  getNotesList,
  togglePinnedNote,
  updateNote,
} from "../utils/api";
import { useState } from "react";
import UpdateNoteModal from "./UpdateNoteModal";
import { Tooltip } from "react-tooltip";
import { motion } from "framer-motion";
import ColorPalatte from "./ColorPalatte";
import deleteSound from "../audio/delete.mp3";
import bgApplySound from "../audio/bg-apply.mp3";
import pinSound from "../audio/pin.wav";
interface Props {
  note: Note;
  setNotesList: React.Dispatch<React.SetStateAction<Note[]>>;
  handleNoteDeleteNavigation: () => void;
}

const NoteCard = ({
  note,
  setNotesList,
  handleNoteDeleteNavigation,
}: Props) => {
  const [isUpdateNoteModalOpen, setIsUpdateNoteModalOpen] =
    useState<boolean>(false);
  const [noteTitle, setNoteTitle] = useState<string>(note.title);
  const [noteTagline, setNoteTagline] = useState<string>(note.tagline);
  const [noteBody, setNoteBody] = useState<string>(note.body);
  const [isColorPalatteOpen, setIsColorPalatteOpen] = useState<boolean>(false);
  const [noteCardHovered, setNoteCardHovered] = useState(false);

  const colorPalatteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: any) => {
      if (!colorPalatteRef.current?.contains(event.target)) {
        setIsColorPalatteOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
  });

  useEffect(() => {
    if (noteCardHovered) {
      const timer = setTimeout(() => {
        setNoteCardHovered(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [noteCardHovered]);

  async function handleUpdateNoteCard() {
    await updateNote(note.id, noteTitle, noteTagline, noteBody);
    setIsUpdateNoteModalOpen(false);
    const response = await getNotesList();
    setNotesList(response.data.newNotesList);
    new Audio(bgApplySound).play();
  }

  async function handlePinNote() {
    const isNotePinned = note.isPinned;
    if (isNotePinned === false) {
      new Audio(pinSound).play();
    }
    await togglePinnedNote(note.id, !isNotePinned);
    const response = await getNotesList();
    setNotesList(response.data.newNotesList);
  }

  async function handleDeleteNote() {
    await deleteNote(note.id);
    handleNoteDeleteNavigation();
    const response = await getNotesList();
    setNotesList(response.data.newNotesList);
    new Audio(deleteSound).play();
  }

  async function handleNoteBackgroundColor(color: string) {
    await changeBackground(note.id, color, "");
    const response = await getNotesList();
    setNotesList(response.data.newNotesList);
    new Audio(bgApplySound).play();
  }

  async function handleNoteBackgroundImage(src: string) {
    await changeBackground(note.id, "", src);
    const response = await getNotesList();
    setNotesList(response.data.newNotesList);
    new Audio(bgApplySound).play();
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          onMouseEnter={() => setNoteCardHovered(true)}
          animate={noteCardHovered ? { rotate: [0, 1, -1, 0] } : { rotate: 0 }}
          transition={{
            duration: 1,
          }}
        >
          <motion.div
            layoutId={note.id}
            className={`break-inside-avoid p-2 bg-gray-50 border mb-5 h-max shadow-lg pointer-events-auto rounded-xl ${
              isUpdateNoteModalOpen && "invisible"
            }`}
            style={{
              backgroundColor: note.bgColor !== "" ? `#${note.bgColor}` : "",
              backgroundImage:
                note.bgImageSrc !== "" ? `url(${note.bgImageSrc})` : "",
              backgroundSize: note.bgImageSrc !== "" ? "cover" : "",
              backgroundRepeat: note.bgImageSrc !== "" ? "repeat" : "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="flex justify-end">
              {note.isPinned ? (
                <TbPinnedFilled
                  className="text-xl font-bold cursor-pointer border-transparent focus:outline-none"
                  onClick={handlePinNote}
                  data-tooltip-id="unpin"
                  data-tooltip-content="Unpin"
                  onMouseEnter={() => setNoteCardHovered(false)}
                />
              ) : (
                <VscPinned
                  className="text-xl font-bold cursor-pointer border-transparent focus:outline-none"
                  onClick={handlePinNote}
                  data-tooltip-id="pin"
                  data-tooltip-content="Pin"
                  onMouseEnter={() => setNoteCardHovered(false)}
                />
              )}
            </div>
            <div>
              <div className="p-2 text-xl font-bold text-wrap break-words">
                {noteTitle}
              </div>
              <div className="font-semibold text-sm pl-2 text-wrap break-words">
                {noteTagline}
              </div>
              <div className="text-lg p-2 text-wrap break-words">
                {noteBody}
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="text-xs font-light m-2 text-gray-900">
                {note.dateOfCreation}
              </div>
              <div
                className="flex justify-end flex-wrap items-center p-1 gap-2 rounded-xl shadow-xl"
                onMouseEnter={() => setNoteCardHovered(false)}
              >
                <img
                  src="https://note-keeper.s3.eu-north-1.amazonaws.com/note-keeper-icons/color-palette.png"
                  alt="color-palatte-icon"
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => setIsColorPalatteOpen(true)}
                  data-tooltip-id="color"
                  data-tooltip-content="Add background"
                />
                <img
                  src="https://note-keeper.s3.eu-north-1.amazonaws.com/note-keeper-icons/edit.png"
                  alt="edit-note-icon"
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => setIsUpdateNoteModalOpen(true)}
                  data-tooltip-id="edit"
                  data-tooltip-content="Edit"
                />
                <img
                  src="https://note-keeper.s3.eu-north-1.amazonaws.com/note-keeper-icons/delete.png"
                  alt="delete-note-icon"
                  className="h-5 w-5 cursor-pointer"
                  onClick={handleDeleteNote}
                  data-tooltip-id="delete"
                  data-tooltip-content="Delete"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      {isColorPalatteOpen && (
        <ColorPalatte
          colorPalatteRef={colorPalatteRef}
          handleNoteBackgroundColor={handleNoteBackgroundColor}
          handleNoteBackgroundImage={handleNoteBackgroundImage}
        />
      )}
      {isUpdateNoteModalOpen && (
        <UpdateNoteModal
          noteId={note.id}
          noteBgImageSrc={note.bgImageSrc}
          noteBgColor={note.bgColor}
          noteTitle={noteTitle}
          setNoteTitle={setNoteTitle}
          noteTagline={noteTagline}
          setNoteTagline={setNoteTagline}
          noteBody={noteBody}
          setNoteBody={setNoteBody}
          setIsUpdateNoteModalOpen={setIsUpdateNoteModalOpen}
          handleUpdateNoteCard={handleUpdateNoteCard}
        />
      )}
      <Tooltip id="pin" className="tooltip" />
      <Tooltip id="unpin" className="tooltip" />
      <Tooltip id="edit" className="tooltip" />
      <Tooltip id="delete" className="tooltip" />
      <Tooltip id="color" className="tooltip" />
    </>
  );
};

export default NoteCard;
