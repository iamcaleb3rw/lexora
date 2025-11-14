import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
export const Editor = () => {
  return (
    <div className="h-full m-0 p-0">
      <SunEditor
        setDefaultStyle="font-family: 'SF Pro'"
        setOptions={{
          height: "500",
          buttonList: buttonList.complex,
          font: ["Verdana", "Arial", "Trebuchet MS", "SF Pro"],
        }}
      ></SunEditor>
    </div>
  );
};

export default Editor;
