import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPthotosToActiveNote,
  setSaving,
  updateNote,
} from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => async (dispatch, getstate) => {
  //uid del usuario
  dispatch(savingNewNote());
  const { uid } = getstate().auth;

  const newNote = {
    title: "",
    body: "",
    imageUrls: [],
    date: new Date().getTime(),
  };

  const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

  await setDoc(newDoc, newNote);
  newNote.id = newDoc.id;

  dispatch(addNewEmptyNote(newNote));
  dispatch(setActiveNote(newNote));
  console.log({ newDoc });
};

export const startLoadingNotes = () => async (dispatch, getState) => {
  const { uid } = getState().auth;
  if (!uid) throw new Error("el uid del usuario no existe ");
  const notes = await loadNotes(uid);
  dispatch(setNotes(notes));
};

export const startSavingNote = () => async (dispatch, getState) => {
  dispatch(setSaving());
  const { uid } = getState().auth;
  if (!uid) throw new Error("el uid del usuario no existe ");
  const { active: note } = getState().journal;

  const noteToFireStore = { ...note };

  delete noteToFireStore.id;

  const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

  await setDoc(docRef, noteToFireStore, { merge: true });

  dispatch(updateNote(note));
};

export const satartUploadingFiles =
  (files = []) =>
  async (dispatch) => {
    dispatch(setSaving());
    console.log(files);

    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
      //creando un array de promesas para dispararlas simultaneamente
    }
    const photoUrls = await Promise.all(fileUploadPromises);
    dispatch(setPthotosToActiveNote(photoUrls));
  };

export const startDeletingNote = () => async (dispatch, getState) => {
  const { uid } = getState().auth;
  const { active: note } = getState().journal;
  const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
  await deleteDoc(docRef);
  dispatch(deleteNoteById(note.id));
};
