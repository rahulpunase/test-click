import { useGetAllSamples } from "@repo/backend/sample/queries";
import { useAuthToken } from "@repo/backend";

export const Home = () => {
  const token = useAuthToken();

  console.log({ token });

  // const { data, isPending, error } = useGetAllSamples();
  // console.log(data, isPending, error);
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold">Home Surface</h1>
      <p>Welcome to the home surface!</p>
    </div>
  );
};
