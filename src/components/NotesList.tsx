import { Note } from "../utils/classModels";
import NoteCard from "./NoteCard";

interface Props {
  currentNotesList: Note[];
  setNotesList: React.Dispatch<React.SetStateAction<Note[]>>;
}

const NotesList = ({ currentNotesList, setNotesList }: Props) => {
  const pinnedNotesList = currentNotesList.filter(
    (note) => note.isPinned === true
  );
  const unpinnedNotesList = currentNotesList.filter(
    (note) => note.isPinned === false
  );

  return (
    <div className="w-[80%] m-auto mt-24">
      {pinnedNotesList.length > 0 && (
        <div className="w-[60%] sm:w-[100%] columns-1 sm:columns-2 md:columns-3 m-auto mb-10">
          {pinnedNotesList.map((note) => (
            <NoteCard key={note.id} note={note} setNotesList={setNotesList} />
          ))}
        </div>
      )}
      {unpinnedNotesList.length > 0 && (
        <div className="w-[80%] columns-1 sm:columns-2 md:columns-3 m-auto">
          {unpinnedNotesList.map((note) => (
            <NoteCard key={note.id} note={note} setNotesList={setNotesList} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesList;
