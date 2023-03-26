import { Form, Button, Card } from "react-bootstrap";
import {
  onSnapshot,
  addDoc,
  Timestamp,
  doc,
  collection,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { async } from "@firebase/util";
import Messages from "../components/Messages";

function ChatRoom() {
  const [userMassage, setUserMassage] = useState("");
  const [allMassages, setAllMessages] = useState([]);
  console.log(allMassages.map((messages) => messages.message));
  useEffect(
    () =>
      onSnapshot(collection(db, "massages"), (snapshot) =>
        setAllMessages(snapshot.docs.map((doc) => doc.data()))
      ),
    []
  );

  const handeSend = async () => {
    await addDoc(collection(db, "massages"), {
      message: userMassage,
      sentBy: auth.currentUser.uid,
      timeSent: Timestamp.now(),
    });
    setUserMassage("");
  };

  return (
    <div className="chatContainer">
        
        {
            allMassages.map((messages) => <Messages message={messages.message} whosent={messages.sentBy} key={messages.timeSent}/> )
        }

      <Form.Group className="mb-3 mt-3 ml-3 sendMessage" controlId="sendText">
        <Form.Control
          type="Text"
          placeholder="Message"
          onChange={(e) => setUserMassage(e.target.value)}
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>
      <Button
        variant="success"
        className="btnSend mb-3 mt-3 ml-3 "
        onClick={handeSend}
      >
        Send
      </Button>
    </div>
  );
}

export default ChatRoom;
