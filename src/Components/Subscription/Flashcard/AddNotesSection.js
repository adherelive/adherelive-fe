import React, {Fragment, useEffect, useState} from "react";
import TextArea from "antd/lib/input/TextArea";
import {useSelector} from "react-redux";
import isEmpty from "../../../Helper/is-empty";

function AddNotesSection({notesData, setNotesData}) {
    const [note, setNote] = useState("");
    const [isAddNote, setIsAddNote] = useState(false);
    const [doctorName, setDoctorName] = useState("");

    const authenticated_user = useSelector(
        (state) => state.auth.authenticated_user
    );
    const doctors = useSelector((state) => state.doctors);

    useEffect(() => {
        let name = "";
        if (!isEmpty(doctors) && !isEmpty(authenticated_user)) {
            for (let each in doctors) {
                if (doctors[each].basic_info.user_id == authenticated_user) {
                    name = doctors[each].basic_info.full_name;
                }
            }
        }
        setDoctorName(name);
    }, [doctors, authenticated_user]);

    const setFlashcardNotes = (e) => {
        const value = e.target.value.trim();

        if (value.length > 0 || value === "") {
            setNote(e.target.value);
        }
    };

    const setPastedFlashcardNotes = (e) => {
        e.preventDefault();
        let pastedValue = "";
        if (typeof e.clipboardData !== "undefined") {
            pastedValue = e.clipboardData.getData("text").trim();
        }
        if (pastedValue.length > 0 || pastedValue === "") {
            setNote(pastedValue);
        }
    };

    const addNoteHadnler = () => {
        let notesCopy = [...notesData];
        notesCopy.push({
            id: Math.floor(Math.random() * 100),
            name: note,
            date: new Date().toISOString(),
            doctorName: doctorName,
        });
        setNotesData(notesCopy);
        setIsAddNote(false);
    };

    const closeNoteHadnler = () => {
        setIsAddNote(false);
    };

    const isAddNoteHandler = (e) => {
        e.preventDefault();
        setNote("");
        setIsAddNote(true);
    };

    const renderAddNotes = () => {
        return (
            <div
                style={{backgroundColor: "white"}}
                className="wp100 fs14 fw700 pt10 pl10 pr10 pb10 mb5"
            >
                <div style={{height: "50px"}}>
                    <TextArea
                        placeholder={"Write Here"}
                        value={note}
                        // className={"form-textarea-ap form-inputs-ap"}
                        onChange={setFlashcardNotes}
                        onPaste={setPastedFlashcardNotes}
                        style={{resize: "none"}}
                        allowClear
                        autoSize={{minRows: 2, maxRows: 2}}
                    />
                </div>

                <div className="flex justify-space-between">
                    <button
                        style={{
                            backgroundColor: "#528ff0",
                            color: "#ffffff",
                            border: "none",
                        }}
                        onClick={addNoteHadnler}
                        className="mt10 pointer"
                    >
                        Add
                    </button>
                    <button
                        style={{
                            backgroundColor: "#528ff0",
                            color: "#ffffff",
                            border: "none",
                        }}
                        onClick={closeNoteHadnler}
                        className="mt10 pointer"
                    >
                        close
                    </button>
                </div>
            </div>
        );
    };

    const renderAddNoteButton = () => {
        return (
            <div
                style={{backgroundColor: "white"}}
                className="wp100 fs14 fw700 pt10 pl10 pr10 pb10 mb5"
            >
                <div
                    className="flex justify-center pointer"
                    style={{padding: "5px", border: "1px solid darkgray"}}
                    onClick={isAddNoteHandler}
                >
                    Add Notes
                </div>
            </div>
        );
    };

    return (
        <Fragment>
            {isAddNote === false ? renderAddNoteButton() : renderAddNotes()}
        </Fragment>
    );
}

export default AddNotesSection;
