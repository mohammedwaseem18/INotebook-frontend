import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h5 className="card-title">{note.title}</h5>
            <div>
              <i
                className="fas fa-trash mx-2"
                onClick={() => {
                  deleteNote(note._id);
                  props.showalert("Notes deleted successfully", "success");
                }}
              ></i>
              <i
                className="fas fa-edit mx-2"
                onClick={() => {
                  updateNote(note);
                }}
              ></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;




