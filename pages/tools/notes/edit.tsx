import React from "react";
import EditorComponent from "@/infraestructure/tools/notes/NotesPages";
function edit() {
  return (
    <div>
      <EditorComponent />
    </div>
  );
}

export default edit;
export const getStaticProps = async () => {
  return { props: {} };
};
