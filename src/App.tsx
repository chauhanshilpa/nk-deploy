import { useEffect, useRef, useState } from "react";
import "./App.css";
import NotesPage from "./components/NotesPage";
import { Note } from "./utils/classModels";
import AddNoteCard from "./components/AddNoteCard";
import { getNotesList } from "./utils/api";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

function App() {
  const [notesList, setNotesList] = useState<Note[]>([]);
  const [isAddNoteClicked, setIsAddNoteClicked] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const navigate = useNavigate();
  let previousNotesListLength = useRef(notesList.length);

  useEffect(() => {
    (async function () {
      const response = await getNotesList();
      setNotesList(response.data.newNotesList);
    })();
  }, []);

  useEffect(() => {
    if (previousNotesListLength.current < notesList.length) {
      const page = Math.floor(notesList.length / 6);
      if (page !== currentPage && notesList.length % 6 !== 0) {
        handlePageNavigation(page);
      }
    }
    previousNotesListLength.current = notesList.length;
    // eslint-disable-next-line
  }, [notesList.length]);

  function handlePageNavigation(newPage: number) {
    setCurrentPage(newPage);
    navigate(`/page/${newPage}`);
  }

  return (
    <>
      <Navbar setCurrentPage={setCurrentPage} />
      {notesList.length > 0 ? (
        <div className="fixed right-0 p-2">
          <img
            src="https://note-keeper.s3.eu-north-1.amazonaws.com/note-keeper-icons/add-a-note.png"
            alt="add-note"
            className="h-10 w-10 mr-5 bg-[#8cc055] cursor-pointer mt-5 border rounded-lg shadow-lg hover:bg-[#7CB342] ml-2"
            onClick={() => setIsAddNoteClicked(true)}
            data-tooltip-id="add-new-note"
            data-tooltip-content="Add note"
          />
        </div>
      ) : (
        <img
          src="https://note-keeper.s3.eu-north-1.amazonaws.com/note-keeper-icons/addNote.png"
          alt="add-note"
          className={`h-80 m-auto mt-20 cursor-pointer ${
            isAddNoteClicked && "hidden"
          }`}
          onClick={() => setIsAddNoteClicked(true)}
          data-tooltip-id="add-new-note"
          data-tooltip-content="Add note"
        />
      )}
      {isAddNoteClicked && (
        <AddNoteCard
          setIsAddNoteClicked={setIsAddNoteClicked}
          setNotesList={setNotesList}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <NotesPage
              notesList={notesList}
              setNotesList={setNotesList}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              handlePageNavigation={handlePageNavigation}
            />
          }
        />
        <Route
          path="/page/:currentPage"
          element={
            <NotesPage
              notesList={notesList}
              setNotesList={setNotesList}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              handlePageNavigation={handlePageNavigation}
            />
          }
        />
      </Routes>
      <Tooltip id="add-new-note" className="tooltip" />
    </>
  );
}

export default App;
