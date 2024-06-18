import { useEffect, useState } from "react";
import "./App.css";
import NotesPage from "./components/NotesPage";
import { Note } from "./utils/classModels";
import AddNoteCard from "./components/AddNoteCard";
import { getNotesList } from "./utils/api";
import Navbar from "./components/Navbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

function App() {
  const [notesList, setNotesList] = useState<Note[]>([]);
  const [isAddNoteClicked, setIsAddNoteClicked] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      const response = await getNotesList();
      setNotesList(response.data.newNotesList);
    })();
  }, []);

  function handleAddNoteClick() {
    const page = Math.floor(notesList.length / 6);
    if (page > currentPage) {
      handlePageNavigation(page);
    }
  }

  function handlePageNavigation(newPage: number) {
    setCurrentPage(newPage);
    navigate(`/page/${newPage}`);
  }

  return (
    <>
      <Navbar setCurrentPage={setCurrentPage} />
      <div className={`${notesList.length > 0 ? "fixed right-0 p-2" : ""}`}>
        <img
          src="https://note-keeper.s3.eu-north-1.amazonaws.com/note-keeper-icons/add-a-note.png"
          alt="add-note"
          className={`bg-[#8cc055] cursor-pointer mt-5 border rounded-lg shadow-lg hover:bg-[#7CB342] ${
            notesList.length > 0 ? "mr-5 h-10 w-10 ml-2" : "h-60 m-auto mt-10"
          }`}
          onClick={() => setIsAddNoteClicked(true)}
          data-tooltip-id="add-new-note"
          data-tooltip-content="Add note"
        />
      </div>
      {isAddNoteClicked && (
        <AddNoteCard
          setIsAddNoteClicked={setIsAddNoteClicked}
          setNotesList={setNotesList}
          handleAddNoteClick={handleAddNoteClick}
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
