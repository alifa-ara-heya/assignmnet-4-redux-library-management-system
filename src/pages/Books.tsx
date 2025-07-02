import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types";

const Books = () => {
  const { data, error, isLoading } = useGetBooksQuery("books");
  //   console.log(data);
  const books = data?.data || [];
  console.log("Books", books);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>This is Books component</h1>

      {error && <p>Error fetching books</p>}
      {books?.length > 0 ? (
        <ul>
          {books.map((book: IBook) => (
            <li key={book._id}>{book.title}</li>
          ))}
        </ul>
      ) : (
        !isLoading && <p>No books found.</p>
      )}
    </div>
  );
};

export default Books;
