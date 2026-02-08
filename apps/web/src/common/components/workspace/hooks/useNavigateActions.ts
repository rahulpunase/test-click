import { useNavigate } from "react-router";
import { useGlobalData } from "@/common/providers/globalDataProvider/globalDataProvider";

export const useNavigateActions = () => {
  const navigate = useNavigate();
  const { workSpace } = useGlobalData();

  const navigateWithWorkspace = (path: string) => {
    navigate(`/${workSpace?.slug}/${path}`);
  };

  return {
    navigateWithWorkspace,
  };
};
