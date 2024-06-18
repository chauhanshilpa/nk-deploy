import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { CiEraser } from "react-icons/ci";
import { createNote, getNotesList } from "../utils/api";
import { Note } from "../utils/classModels";
import { Tooltip } from "react-tooltip";

interface Props {
  setIsAddNoteClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setNotesList: React.Dispatch<React.SetStateAction<Note[]>>;
  handleAddNoteClick: ()=>void;
}

const AddNoteCard = ({ setIsAddNoteClicked, setNotesList, handleAddNoteClick }: Props) => {
  const [inputNoteTitle, setInputNoteTitle] = useState<string>("");
  const [inputNoteTagline, setInputNoteTagline] = useState<string>("");
  const [inputNoteBody, setInputNoteBody] = useState<string>("");

  async function handleAddNote(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    handleAddNoteClick();
    await createNote(inputNoteTitle, inputNoteTagline, inputNoteBody);
    const response = await getNotesList();
    setNotesList(response.data.newNotesList);
    setIsAddNoteClicked(false);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 mt-5">
      <div className="flex flex-col fixed justify-center bg-gray-50 border shadow p-5 rounded-xl m-auto md:w-[40%] xs:w-[90%]">
        <img
          src="https://note-keeper.s3.eu-north-1.amazonaws.com/note-keeper-icons/cancel.png"
          alt="cancel"
          className="h-5 w-5 cursor-pointer self-end hover:scale-125"
          onClick={() => setIsAddNoteClicked(false)}
          data-tooltip-id="cancel"
          data-tooltip-content="Cancel"
        />
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="title"
            className="py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 focus:outline-none focus:ring-0 peer"
            placeholder="title"
            required
            value={inputNoteTitle}
            onChange={(event) => setInputNoteTitle(event?.target.value)}
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="tagline"
            className="py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 focus:outline-none focus:ring-0 peer"
            placeholder="tagline"
            value={inputNoteTagline}
            onChange={(event) => setInputNoteTagline(event?.target.value)}
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="body"
            className="py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 focus:outline-none focus:ring-0 peer"
            placeholder="body"
            required
            value={inputNoteBody}
            onChange={(event) => setInputNoteBody(event?.target.value)}
          />
        </div>
        <div className="flex">
          <button
            type="button"
            className="flex items-center text-white bg-blue-500 hover:bg-blue-600  focus:ring-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none border-transparent focus:ring-1"
            onClick={handleAddNote}
          >
            <span>
              <IoIosAdd className="text-xl" />
            </span>
            <span>Add</span>
          </button>
          <button
            type="button"
            className="flex items-center text-white bg-blue-500 hover:bg-blue-600  focus:ring-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none border-transparent focus:ring-1"
            onClick={() => {
              setInputNoteTitle("");
              setInputNoteTagline("");
              setInputNoteBody("");
            }}
          >
            <span>
              <CiEraser className="text-xl mr-1" />
            </span>
            <span>Clear field</span>
          </button>
        </div>
      </div>
      <Tooltip id="cancel" className="tooltip" />
    </div>
  );
};

export default AddNoteCard;
