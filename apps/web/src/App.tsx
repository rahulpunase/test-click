import { useState } from "react";
import { Button } from "@repo/ui/button/Button";
import { Plus, Save, Trash2, Settings } from "lucide-react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Button variant="solid" color="primary">
        Button
      </Button>
    </div>
  );
}

export default App;
