import React, {Fragment, useEffect, useState} from "react";
import Tooltip from "antd/es/tooltip";
import {CheckOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import isEmpty from "../../../Helper/is-empty";
import moment from "moment";
import {useSelector} from "react-redux";

function NotesList({
                       notesData,
                       setNotesData,
                       editNoteId,
                       editNoteHanlder,
                       deleteNoteHandler,
                       setEditNoteId,
                   }) {
    const [isPublished, setIsPublished] = useState("");

    const flashCard = useSelector((state) => state.subscription.flashCardData);

    useEffect(() => {
        if (!isEmpty(flashCard)) {
            setIsPublished(flashCard.is_published);
        } else {
        }
    }, [flashCard]);

    const saveNoteHanlder = (value) => {
        // alert("save note");
        // setNote(value.name);
        setEditNoteId("");
    };

    const onChangeNotes = (noteData, index) => (e) => {
        const value = e.target.value.trim();
        let notesDataCopy = [...notesData];
        notesDataCopy[index].name = e.target.value;

        if (value.length > 0 || value === "") {
            setNotesData(notesDataCopy);
        }
    };

    const setPastedFlashcardNotes = (noteData, index) => (e) => {
        e.preventDefault();
        let pastedValue = "";
        let notesDataCopy = [...notesData];

        if (typeof e.clipboardData !== "undefined") {
            pastedValue = e.clipboardData.getData("text").trim();
        }
        notesDataCopy[index].name = pastedValue;

        if (pastedValue.length > 0 || pastedValue === "") {
            setNotesData(notesDataCopy);
        }
    };

    const renderNotesList = () => {
        return (
            !isEmpty(notesData) &&
            notesData.map((note, index) => {
                return (
                    <div
                        key={index}
                        style={{backgroundColor: "white"}}
                        className="wp100 fs14 fw700 pt10 pl10 pr10 pb10 mb5"
                    >
                        {editNoteId === note.id ? (
                            <TextArea
                                placeholder={"Write Here"}
                                value={note.name}
                                className={"form-textarea-ap form-inputs-ap"}
                                onChange={onChangeNotes(note, index)}
                                onPaste={setPastedFlashcardNotes}
                                style={{resize: "none"}}
                                allowClear
                                autoSize={{minRows: 2, maxRows: 6}}
                            />
                        ) : (
                            note.name
                        )}
                        <div className="flex justify-space-between align-baseline">
                            <div style={{display: "grid"}}>
                                <span style={{color: "#528ff0"}}>{note.doctorName}</span>{" "}
                                <span style={{color: "#528ff0"}}>
                  {moment(note.date).format("Do MMMM hh:mm a")}
                </span>
                            </div>
                            {isPublished !== 1 && (
                                <div>
                                    {editNoteId === note.id ? (
                                        <Tooltip placement={"bottom"} title={"Save Notes"}>
                                            <CheckOutlined
                                                className={"pointer align-self-end ml10"}
                                                style={{fontSize: "18px", color: "#6d7278"}}
                                                onClick={() => saveNoteHanlder(note)}
                                            />
                                        </Tooltip>
                                    ) : (
                                        <Tooltip placement={"bottom"} title={"Edit Notes"}>
                                            <EditOutlined
                                                className={"pointer align-self-end ml10"}
                                                // onClick={handleEdit(id)}
                                                style={{fontSize: "18px", color: "#6d7278"}}
                                                onClick={() => editNoteHanlder(note, index)}
                                            />
                                        </Tooltip>
                                    )}

                                    <Tooltip placement={"bottom"} title={"Delete Notes"}>
                                        <DeleteOutlined
                                            className={"pointer align-self-end ml10"}
                                            // onClick={handleDelete(id)}
                                            style={{fontSize: "18px", color: "#6d7278"}}
                                            onClick={() => deleteNoteHandler(note, index)}
                                        />
                                    </Tooltip>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })
        );
    };

    return <Fragment>{renderNotesList()}</Fragment>;
}

export default NotesList;
