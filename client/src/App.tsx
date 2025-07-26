import { useState } from "react";
import { Button } from "@/components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col max-w-md m-auto gap-2">
        <Button onClick={() => setCount((count) => count + 1)}>Up</Button>
        <Button onClick={() => setCount((count) => count - 1)}>Down</Button>
        <p className="text-indigo-400 m-auto">{count}</p>
      </div>
    </>
  );
}

export default App;
