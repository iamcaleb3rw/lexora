import { FC } from "react";
import {
  EditorComposer,
  Editor,
  ToolbarPlugin,
  InsertDropdown,
  AlignDropdown,
} from "verbum";

const NoteViewer: FC = () => {
  return (
    <div className="border-2 h-full m-0 p-0">
      <EditorComposer>
        <Editor hashtagsEnabled={true}>
          <ToolbarPlugin defaultFontSize="12px">
            <InsertDropdown enableEquations />
            <AlignDropdown />
          </ToolbarPlugin>
        </Editor>
      </EditorComposer>
    </div>
  );
};

export default NoteViewer;
