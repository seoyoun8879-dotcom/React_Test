import { useNavigate } from "react-router-dom";
import style from "./Button.module.scss";

type Props = {
    subClass: string;
    text: string;
}

function Button({subClass, text}: Props) {
    const navigate = useNavigate();

    return (
        <div
            className={`${style.btn} ${style[subClass]}`}
            onClick={() => navigate(`/${subClass}`)}
        >
            {text}
        </div>
    )
}

export default Button;