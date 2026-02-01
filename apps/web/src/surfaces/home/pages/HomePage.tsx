import {
  useFetchCurrentUser,
  useGetCurrentUser,
} from "@repo/backend/user/queries";
import { useAuthToken } from "@repo/backend";

export const Home = () => {
  const { data: user, isPending, error } = useGetCurrentUser();
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold">Home Surface</h1>
      <p>Welcome to the home surface!</p>
    </div>
  );
};
