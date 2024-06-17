import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
// create a note
export async function createNote(
  inputNoteTitle: string,
  inputNoteTagline: string,
  inputNoteBody: string
) {
  await axios.post(`${BASE_URL}/create_note`, {
    inputNoteTitle,
    inputNoteTagline,
    inputNoteBody,
  });
}

// get noteList
export async function getNotesList() {
  const response = await axios.get(`${BASE_URL}/notes_list`)
  return response;
}

// update note text
export async function updateNote(
  noteId: string,
  newTitle: string,
  newTagline: string,
  newBody: string
) {
  await axios.patch(`${BASE_URL}/update_note`, {
    noteId,
    newTitle,
    newTagline,
    newBody,
  });
}

// update pinned status of note
export async function togglePinnedNote(noteId: string, isPinned: boolean) {
  await axios.patch(`${BASE_URL}/update_pin_status`, {
    noteId,
    isPinned,
  });
}

export async function changeBackground(noteId:string, color: string, src: string) {
  await axios.patch(`${BASE_URL}/update_note_background`, {
    noteId,
    color,
    src,
  });
}

// delete a note
export async function deleteNote(noteId: string) {
  await axios.delete(`${BASE_URL}/delete_note`, {
    params: {
      noteId,
    },
  });
}
