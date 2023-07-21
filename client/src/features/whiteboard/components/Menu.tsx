import { ToolType, toolTypes } from "../../../constants/toolType";
import { useDispatch, useSelector } from "react-redux";
import { selectToolType, setElements, setToolType } from "../slices/whiteboardSlice";

import selectionIcon from "../../../assets/selection.svg";
import rectangleIcon from "../../../assets/rectangle.svg";
import diamondIcon from "../../../assets/diamond.svg";
import ellipseIcon from "../../../assets/ellipse.svg";
import arrowIcon from "../../../assets/arrow.svg";
import lineIcon from "../../../assets/line.svg";
import pencilIcon from "../../../assets/draw.svg";
import textIcon from "../../../assets/text.svg";
import insertImageIcon from "../../../assets/insert_image.svg";
import eraserIcon from "../../../assets/eraser.svg";

const iconMap = {
    [toolTypes.SELECTION]: selectionIcon,
    [toolTypes.RECTANGLE]: rectangleIcon,
    [toolTypes.DIAMOND]: diamondIcon,
    [toolTypes.ELLIPSE]: ellipseIcon,
    [toolTypes.ARROW]: arrowIcon,
    [toolTypes.LINE]: lineIcon,
    [toolTypes.PENCIL]: pencilIcon,
    [toolTypes.TEXT]: textIcon,
    [toolTypes.INSERT_IMAGE]: insertImageIcon,
    [toolTypes.ERASER]: eraserIcon,
};

const Menu = () => {
    const dispatch = useDispatch();
    const selectedToolType = useSelector(selectToolType);

    const handleToolChange = (type: ToolType) => {
        dispatch(setToolType(type));
    };

    return (
        <div className="menu_container">
            {Object.entries(iconMap).map(([type, iconSrc]) => (
                <button
                    key={type}
                    className={`menu_button ${selectedToolType === type ? "menu_button_active" : ""}`}
                    onClick={() => handleToolChange(type)}
                >
                    <img src={iconSrc} alt="" width="80%" height="80%" />
                </button>
            ))}
        </div>
    );
};

export default Menu;
