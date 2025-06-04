import { useIsmacData } from "@/context/withContext";
import ToolsPages from "../tools/ToolsPages";

function HomePages() {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center"></div>
      <>
        <ToolsPages />
      </>
    </>
  );
}

export default HomePages;
