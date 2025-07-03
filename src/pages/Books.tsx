import BookTable from "@/components/BookTable";
import { Button } from "@/components/ui/button";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import BannerImg from "@/assets/banner.jpg";
import { Link } from "react-router";
import { useState } from "react";
import { MoveLeft, MoveRight } from "lucide-react";

const Books = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, error, isLoading } = useGetBooksQuery({ page, limit });
  //   console.log(data);
  const books = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;
  //   console.log("Books", books);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div
        className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] bg-cover bg-center rounded-xl my-6 shadow-2xl shadow-blue-950"
        style={{ backgroundImage: `url(${BannerImg})` }}
      ></div>

      <div className="flex justify-between items-center my-6">
        <h1 className="font-medium">All Books</h1>
        <Link to="/create-book">
          <Button className="bg-blue-400 hover:bg-blue-500">Add Books</Button>
        </Link>
      </div>

      {error && <p>Error fetching books</p>}
      {books?.length > 0 ? (
        <BookTable books={books} />
      ) : (
        !isLoading && <p>No books found.</p>
      )}

      <div className="flex justify-center gap-2 mt-6 text-sm items-center">
        <Button
          disabled={page === 1}
          variant={"outline"}
          className="border-none"
          onClick={() => setPage((prev) => prev - 1)}
        >
          <MoveLeft className="w-4 h-4" />
          Prev
        </Button>
        <span className="px-3 py-1 rounded">
          Page {page} of {totalPages}
        </span>
        <Button
          disabled={page === totalPages}
          variant={"outline"}
          className="border-none"
          onClick={() => setPage((prev) => prev + 1)}
        >
          {" "}
          Next
          <MoveRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Books;
