import { RouterProvider } from "react-router";
import { router } from "@/common/configs/RouterConfiguration";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
