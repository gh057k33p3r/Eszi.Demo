import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import "./Loader.css";

export function Loader() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const isLoading = isFetching + isMutating > 0;

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      ) : null}
    </>
  );
}
