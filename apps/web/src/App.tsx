import { useState } from "react";
import { Button } from "@repo/ui/button/Button";
import { Plus } from "lucide-react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-8">
      <Button
        variant="solid"
        color="primary"
        icon={Plus}
        onClick={() => setCount(count + 1)}
      >
        Increment
      </Button>
    </div>
  );
}

export default App;
