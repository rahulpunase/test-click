import { useState } from "react";
import { Button } from "@repo/ui/button/Button";
import { Plus } from "lucide-react";
import "./App.css";
import { useGetAllSamples } from "@repo/backend/sample/queries";

function App() {
  const [count, setCount] = useState(0);

  const { data, isPending, error } = useGetAllSamples();

  console.log(data, isPending, error);

  return (
    <div className="">
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
