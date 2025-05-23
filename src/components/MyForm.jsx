import { useState } from "react";
import { FormControl } from "react-bootstrap";

const MyForm = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return <FormControl className="w-50 my-4" type="text" placeholder="Cerca una città" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />;
};

export default MyForm;
