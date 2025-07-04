import BookTable from "@/components/BookTable";
import { Button } from "@/components/ui/button";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import BannerImg from "@/assets/banner.jpg";
import { Link } from "react-router";
import { useState } from "react";
import { MoveLeft, MoveRight } from "lucide-react";
import Loader from "@/components/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Books = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");
  const [genre, setGenre] = useState("");

  const limit = 10;

  const { data, error, isLoading } = useGetBooksQuery(
    {
      page,
      limit,
      sort,
      sortBy: "createdAt",
      filter: genre,
    },
    {
      pollingInterval: 30000, // fetch every 30s
      refetchOnFocus: true, //  when browser regains focus
      refetchOnMountOrArgChange: true, //when args change (like page or genre)
      refetchOnReconnect: true, // when internet reconnects
    }
  );
  //   console.log(data);
  const books = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;
  //   console.log("Books", books);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div
        className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] bg-cover bg-center rounded-xl my-6 shadow-2xl shadow-blue-950"
        style={{ backgroundImage: `url(${BannerImg})` }}
      ></div>

      <div className="flex justify-between items-center my-6">
        <h1 className="font-medium">All Books</h1>
      </div>

      <div className="flex flex-wrap md:justify-start gap-4 items-center mb-6">
        {/* Sort by */}
        <Select onValueChange={(value) => setSort(value)} defaultValue="desc">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Newest First</SelectItem>
            <SelectItem value="asc">Oldest First</SelectItem>
          </SelectContent>
        </Select>

        {/* Filter by Genre */}
        <Select
          onValueChange={(value) => {
            if (value === "ALL") {
              setGenre(""); //clears filter
            } else {
              setGenre(value);
            }
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="FICTION">Fiction</SelectItem>
            <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
            <SelectItem value="SCIENCE">Science</SelectItem>
            <SelectItem value="HISTORY">History</SelectItem>
            <SelectItem value="BIOGRAPHY">Biography</SelectItem>
            <SelectItem value="FANTASY">Fantasy</SelectItem>
          </SelectContent>
        </Select>

        <Link to="/create-book" className="ml-auto">
          <Button className="bg-blue-400 hover:bg-blue-500 ">Add Books</Button>
        </Link>
      </div>

      {error && <p>Error fetching books</p>}
      {books?.length > 0 ? (
        <BookTable books={books} />
      ) : (
        !isLoading && <p>No books found.</p>
      )}

      {/* pagination */}
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
