import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
// import Noteitem from './Noteitem';
import AddNote from "./AddNote";
 import Noteitem from "./NoteItem";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import JoditEditor from "jodit-react";
import "./Notes.css";

const Notes = (props) => {
  const context = useContext(NoteContext);
  let navigate = useNavigate();
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const handleClick = (e) => {
    console.log("updating the note", note);
    console.log(note.edescription);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showalert("Notes updated successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { list: "check" },
        { list: "indent" },
        { list: "outdent" },
      ],
      ["link", "image", "video", "imageDelete"],
      [{ color: [] }, { background: [] }],
      ["align", "direction"],
      ["code-block"],
      ["clean"],
      ["formula"],
      ["superscript", "subscript"],
      ["indent", { indent: "-1" }, { indent: "+1" }],
      [{ script: "sub" }, { script: "super" }],
      ["emoji"],
      ["undo", "redo"],
      ["table"],
      ["imageAlt"],
      ["fullScreen"],
      ["print"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "check",
    "indent",
    "outdent",
    "link",
    "image",
    "video",
    "color",
    "background",
    "align",
    "direction",
    "code-block",
    "clean",
    "formula",
    "superscript",
    "subscript",
    "indent",
    "script",
    "emoji",
    "undo",
    "redo",
    "table",
     "imageAlt",
    "fullScreen",
    "print",
  ];


  return (
    <>
      <AddNote showalert={props.showalert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo model
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="container my-3" onSubmit={handleClick}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>

                 <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />

               
                </div> 
                                {/* <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <ReactQuill
                  type="text"
                   id="edescription"
                   name="edescription"
                    theme="snow"
                    value={note.edescription}
                    onChange={(content) => setNote({ ...note, edescription: content })}
                    modules={modules}
                    formats={formats}
                    className="form-control"
                  />
                </div> */}

                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    TAG
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                style={{
                  backgroundColor: "#6f6868",
                  borderColor: "#6f6868",
                  color: "white",
                }}
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
                style={{
                  backgroundColor: "#ff3d3d",
                  borderColor: "#ff3d3d",
                  color: "white",
                }}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => (
          <Noteitem
            key={note._id}
            updateNote={updateNote}
            showalert={props.showalert}
            note={note}
          />
        ))}
      </div>
    </>
  );
};

export default Notes;
