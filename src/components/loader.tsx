import HashLoader from "react-spinners/HashLoader";

interface LoaderProps {
  loading: boolean;
}

export default function Loader({ loading }: LoaderProps) {
  return (
    <div className="flex justify-center items-center mt-36">
      <HashLoader
        color="#36d7b7"
        loading={loading}
        size={100}
        aria-label="Loading Spinner"
      />
    </div>
  );
}
