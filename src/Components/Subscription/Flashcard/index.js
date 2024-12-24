import React, {useState, useEffect, Fragment} from "react";
import {
    Form,
    Input,
    Button,
    Spin,
    // Avatar,
    Upload,
    // Modal,
    message,
    Switch,
} from "antd";
import Close from "../../../Assets/images/close.png";
import isEmpty from "../../../Helper/is-empty";
import {setFlashCard} from "./../../../modules/subscription/flashcard";
import {fetchReports} from "./../../../modules/reports";
import {useDispatch, useSelector} from "react-redux";
import AddNotesSection from "./AddNotesSection";
import NotesList from "./NotesList";
import {
    addFlashcard,
    updateFlashcardById,
    setFlashcardData,
} from "../../../modules/subscription/flashcard";
import {MinusOutlined} from "@ant-design/icons";
import {ShrinkOutlined} from "@ant-design/icons";
import {SET_ACTIVITY_DATA_FOR_SCHEDULE} from "../../../reducer/index";

const Header = ({close, minimizeHandler, minimize}) => {
    // let pic = patientName ?
    //     <Avatar src={patientDp}>{patientName[0]}</Avatar> : <Avatar src={patientDp} icon="user" />
    return (
        <div className="chat-patientListheader-PopUp pt4 pb4">
            <div className="flex direction-row align-center ">
                <div className="flex direction-column  justify-center">
                    <div
                        className="doctor-name-chat-header-popup"
                        // onClick={onHeaderClick}
                    >
                        Virtual health Score card
                    </div>
                </div>
            </div>

            <div className="flex direction-row align-center">
                {minimize === true ? (
                    <ShrinkOutlined
                        className={"pointer align-self-end"}
                        onClick={minimizeHandler}
                        style={{fontSize: "18px", color: "#ffffff", marginRight: "15px"}}
                    />
                ) : (
                    <MinusOutlined
                        className={"pointer align-self-end"}
                        onClick={minimizeHandler}
                        style={{fontSize: "18px", color: "#ffffff", marginRight: "15px"}}
                    />
                )}

                <img
                    src={Close}
                    className="callIcon-header-PopUp mr20"
                    onClick={close}
                />
            </div>
        </div>
    );
};

const flashCardInitialState = {
    activityId: "",
    patientId: "",
    flashCardId: "",
    flashCardQue: [],
    flashCardNotes: [],
    is_published: "",
};

function FlashCard() {
    const dispatch = useDispatch();
    const [values, setValues] = useState({messagesLoading: false});
    const [flashCardQue, setFlashcardQue] = useState([]);
    const [notesData, setNotesData] = useState([]);
    const [editNoteId, setEditNoteId] = useState("");
    const [minimize, setMinimize] = useState(false);
    const [isPublished, setIsPublished] = useState("");

    const flashCard = useSelector((state) => state.subscription.flashCardData);
    const chatVisible = useSelector((state) => state.chats.visible);
    const activityData = useSelector(
        (state) => state.subscription.scheduleAppointment
    );
    useEffect(() => {
        if (!isEmpty(flashCard)) {
            setFlashcardQue(flashCard.flashCardQue);
            setNotesData(flashCard.flashCardNotes);
            setIsPublished(flashCard.is_published);
        } else {
        }
    }, [flashCard]);

    const closePopUpHandler = async () => {
        if (isPublished !== 1) {
            let payload = {
                data: {
                    flashCardData: flashCardQue,
                },

                is_published: false,
                notes: notesData,
            };
            let response = "";
            if (!isEmpty(flashCard.flashCardId)) {
                payload.patient_id = flashCard.patientId;
                payload.tx_activity_id = flashCard.activityId;
                response = await dispatch(
                    updateFlashcardById(flashCard.flashCardId, payload)
                );
                dispatch(fetchReports(flashCard.patientId));
            } else {
                payload.patient_id = !isEmpty(activityData) && activityData.patient_id;
                payload.tx_activity_id = !isEmpty(activityData) && activityData.id;
                response = await dispatch(addFlashcard(payload));
                dispatch(fetchReports(payload.patient_id));
            }
            const {status} = response;
            if (status == true) {
                // message.success("Flashcard saved as draft");
                dispatch(setFlashCard(false));
                dispatch(setFlashcardData(flashCardInitialState));
                dispatch({
                    type: SET_ACTIVITY_DATA_FOR_SCHEDULE,
                    payload: {},
                });
            } else {
                message.error("Something went wrong");
            }
        } else {
            dispatch(setFlashCard(false));
            dispatch(setFlashcardData(flashCardInitialState));
            dispatch({
                type: SET_ACTIVITY_DATA_FOR_SCHEDULE,
                payload: {},
            });
        }
    };

    const onChangeHandler = (value, index) => {
        let data = [...flashCardQue];

        data[index].ans = value;
        setFlashcardQue(data);
    };

    const publishHandler = async () => {
        let payload = {
            data: {
                flashCardData: flashCardQue,
            },

            is_published: true,
            notes: notesData,
        };
        let response = "";
        if (!isEmpty(flashCard.flashCardId)) {
            payload.patient_id = flashCard.patientId;
            payload.tx_activity_id = flashCard.activityId;
            response = await dispatch(
                updateFlashcardById(flashCard.flashCardId, payload)
            );
            dispatch(fetchReports(flashCard.patientId));
        } else {
            payload.patient_id = !isEmpty(activityData) && activityData.patient_id;
            payload.tx_activity_id = !isEmpty(activityData) && activityData.id;
            response = await dispatch(addFlashcard(payload));
            dispatch(fetchReports(payload.patient_id));
        }

        const {status} = response;
        if (status == true) {
            message.success("Flashcard published successfully");
            dispatch(setFlashCard(false));
            dispatch(setFlashcardData(flashCardInitialState));
            dispatch({
                type: SET_ACTIVITY_DATA_FOR_SCHEDULE,
                payload: {},
            });
        } else {
            message.error("Something went wrong");
        }
    };

    const draftHandler = async () => {
        let payload = {
            data: {
                flashCardData: flashCardQue,
            },

            is_published: false,
            notes: notesData,
        };
        let response = "";
        if (!isEmpty(flashCard.flashCardId)) {
            payload.patient_id = flashCard.patientId;
            payload.tx_activity_id = flashCard.activityId;
            response = await dispatch(
                updateFlashcardById(flashCard.flashCardId, payload)
            );
            dispatch(fetchReports(flashCard.patientId));
        } else {
            payload.patient_id = !isEmpty(activityData) && activityData.patient_id;
            payload.tx_activity_id = !isEmpty(activityData) && activityData.id;
            response = await dispatch(addFlashcard(payload));
            dispatch(fetchReports(payload.patient_id));
        }
        const {status} = response;
        if (status == true) {
            message.success("Flashcard saved as draft");
            dispatch(setFlashCard(false));
            dispatch(setFlashcardData(flashCardInitialState));
            dispatch({
                type: SET_ACTIVITY_DATA_FOR_SCHEDULE,
                payload: {},
            });
        } else {
            message.error("Something went wrong");
        }
    };

    const editNoteHanlder = (value, index) => {
        // let notesCopy = [...notesData];
        // setNote(value.name);
        setEditNoteId(value.id);
    };

    const deleteNoteHandler = (value, index) => {
        let notesCopy = [...notesData];

        notesCopy.splice(index, 1);
        console.log("notesCopy", notesCopy);
        setNotesData(notesCopy);
        // setNote(value.name);
        // setEditNoteId(value.id);
    };

    const minimizeHandler = () => {
        setMinimize(!minimize);
    };

    const renderFlashCardQue = () => {
        return (
            !isEmpty(flashCardQue) &&
            flashCardQue.map((data, index) => {
                return (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                        className="wp100 fs14 fw700"
                    >
                        <p>{`${index + 1}. ${data.que}`}</p>{" "}
                        <div>
                            <Switch
                                onChange={(value) => onChangeHandler(value, index)}
                                defaultChecked={data.ans}
                                disabled={isPublished === 1 ? true : false}
                            />
                        </div>
                    </div>
                );
            })
        );
    };

    return (
        <Fragment>
            <div
                className={
                    minimize === true
                        ? chatVisible
                            ? " flashcard-display-with_chat flashcard-minimized"
                            : "flashcard-minimized"
                        : chatVisible
                            ? "flashcard-display-with_chat chat-popup-closedDrawer"
                            : "chat-popup-closedDrawer"
                }
            >
                <div className={"popup-chatWindow"}>
                    <Header
                        minimize={minimize}
                        minimizeHandler={minimizeHandler}
                        close={closePopUpHandler}
                    />
                    <div className="twilio-chat-container-popUp">
                        <div className="twilio-chat-body">
                            {values.messagesLoading ? (
                                <div className="wp100 hp100 flex justify-center align-center">
                                    <Spin size="default"/>
                                </div>
                            ) : (
                                <div className="wp100 hp100">
                                    <div
                                        style={{backgroundColor: "white"}}
                                        className="pt10 mb5 wp100 justify-fs12 pl10 pr10"
                                    >
                                        {renderFlashCardQue()}
                                    </div>
                                    <NotesList
                                        editNoteHanlder={editNoteHanlder}
                                        deleteNoteHandler={deleteNoteHandler}
                                        notesData={notesData}
                                        setNotesData={setNotesData}
                                        editNoteId={editNoteId}
                                        setEditNoteId={setEditNoteId}
                                    />
                                </div>
                            )}
                            <div id="chatEnd" style={{float: "left", clear: "both"}}/>
                        </div>
                        {isPublished !== 1 && (
                            <AddNotesSection
                                notesData={notesData}
                                setNotesData={setNotesData}
                            />
                        )}
                    </div>

                    {
                        <div
                            className={
                                minimize === true
                                    ? "flashcard-publish-hide"
                                    : "twilio-chat-footer-popUp "
                            }
                        >
                            <div
                                style={{display: "flex", justifyContent: "space-between"}}
                                className="footer-right-popUp"
                            >
                                <Button
                                    style={{
                                        backgroundColor: "#92d04f",
                                        border: "none",
                                        color: "white",
                                    }}
                                    htmlType="submit"
                                    onClick={publishHandler}
                                    disabled={isPublished === 1 ? true : false}
                                >
                                    {isPublished === 1 ? "Published" : "Publish Report"}
                                </Button>

                                <Button
                                    style={{
                                        backgroundColor: "#92d04f",
                                        border: "none",
                                        color: "white",
                                    }}
                                    htmlType="submit"
                                    onClick={draftHandler}
                                    disabled={isPublished === 1 ? true : false}
                                >
                                    Save Draft
                                </Button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </Fragment>
    );
}

export default FlashCard;
