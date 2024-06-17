// import { useEffect } from "react";
import { Note } from "../utils/classModels";
import NotesList from "./NotesList";
import { GrPrevious, GrNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
interface Props {
  notesList: Note[];
  setNotesList: React.Dispatch<React.SetStateAction<Note[]>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  handlePageNavigation: (newPage: number) => void;
}

const NotePage = ({
  notesList,
  setNotesList,
  currentPage,
  setCurrentPage,
  handlePageNavigation,
}: Props) => {

  // const navigate = useNavigate();

  const notesPerPage = 6;
  const startIndex = currentPage * notesPerPage;
  const endIndex = startIndex + notesPerPage;
  const currentNotesList = notesList.slice(startIndex, endIndex);

  // for navigate with arrow buttons
  // useEffect(() => {
  //   const pageNavigationHandler = (event: KeyboardEvent) => {
  //     if (event.key === "ArrowRight") {
  //       setCurrentPage(currentPage + 1);
  //       navigate(`/page/${currentPage + 1}`);
  //     } else if (event.key === "ArrowLeft") {
  //       setCurrentPage(currentPage - 1);
  //       navigate(`/page/${currentPage - 1}`);
  //     }
  //   };
  //   window.addEventListener("keydown", pageNavigationHandler);
  // });

  return (
    <div>
      <NotesList
        currentNotesList={currentNotesList}
        setNotesList={setNotesList}
      />
      <div className="flex justify-between items-center mx-5">
        <button
          className={`fixed left-0 top-1/2 transform -translate-y-1/2 px-5 py-2 rounded ${
            currentPage === 0 ? "text-white" : "hover:text-blue-500"
          }`}
          disabled={currentPage === 0}
          onClick={() => handlePageNavigation(currentPage - 1)}
        >
          <GrPrevious className="text-xl" />
        </button>
        <button
          className={`fixed right-0 top-1/2 transform -translate-y-1/2 px-5 py-2 rounded  ${
            endIndex >= notesList.length ? "text-white" : "hover:text-blue-500"
          }`}
          disabled={endIndex >= notesList.length}
          onClick={() => handlePageNavigation(currentPage + 1)}
        >
          <GrNext className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default NotePage;
