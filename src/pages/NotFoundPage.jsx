import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-6xl font-extrabold text-primary">404</h1>
      <p className="mt-4 text-xl font-semibold text-gray-800">Page Not Found</p>
      <p className="mt-2 text-sm text-gray-500">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-primary px-5 py-2.5 font-semibold text-white shadow transition hover:bg-primary-dark"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;