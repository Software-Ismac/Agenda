import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Public() {
  const { query } = useRouter();
  const noteId = query.id;
  useEffect(() => {}, [query]);
  return (
    <div>
      <></>
    </div>
  );
}

export default Public;
