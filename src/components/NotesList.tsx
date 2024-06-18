import { Note } from "../utils/classModels";
import NoteCard from "./NoteCard";
import { useLocation } from "react-router-dom";

interface Props {
  currentNotesList: Note[];
  setNotesList: React.Dispatch<React.SetStateAction<Note[]>>;
  handlePageNavigation: (newPage: number) => void;
}

const NotesList = ({
  currentNotesList,
  setNotesList,
  handlePageNavigation,
}: Props) => {
  const { pathname } = useLocation();
  const pinnedNotesList = currentNotesList.filter(
    (note) => note.isPinned === true
  );
  const unpinnedNotesList = currentNotesList.filter(
    (note) => note.isPinned === false
  );

  function handleNoteDeleteNavigation() {
    const urlEndpoint = pathname.split("/");
    const currentPage = Number(urlEndpoint[urlEndpoint.length - 1]);
    if (
      currentNotesList.length <= 1 &&
      (currentPage !== 0 || pathname !== "/")
    ) {
      handlePageNavigation(currentPage - 1);
    }
  }

  return (
    <div className="w-[80%] m-auto mt-24">
      {pinnedNotesList.length > 0 && (
        <div className="w-[80%] columns-1 sm:columns-2 md:columns-3 m-auto mb-10">
          {pinnedNotesList.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              setNotesList={setNotesList}
              handleNoteDeleteNavigation={handleNoteDeleteNavigation}
            />
          ))}
        </div>
      )}
      {unpinnedNotesList.length > 0 && (
        <div className="w-[80%] columns-1 sm:columns-2 md:columns-3 m-auto">
          {unpinnedNotesList.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              setNotesList={setNotesList}
              handleNoteDeleteNavigation={handleNoteDeleteNavigation}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesList;
