import { auth } from "../utils/firebase";
import "../App.css"

function Messages(props) {
    const currentUsr = auth.currentUser.uid;

    if (props.whosent === currentUsr) {
        return <p className="sentbyUser">{props.message}</p>
    }else{
        return <p className="otherUsers">{props.message}</p>
    }
}

export default Messages;
