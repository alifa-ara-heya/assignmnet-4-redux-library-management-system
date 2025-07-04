import {
  Dialog,
  DialogContent,
  //   DialogDescription,
  DialogHeader,
  DialogTitle,
  //   DialogTrigger,
} from "@/components/ui/dialog";
import { useGetBookQuery } from "@/redux/api/baseApi";
import type { BookModalProps } from "@/types";

const BookDetailsModal = ({ bookId, open, onOpenChange }: BookModalProps) => {
  const { data, isLoading, error } = useGetBookQuery(bookId, {
    skip: !bookId,
  });

  const book = data?.data;
  // console.log(book);

  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book Details</DialogTitle>
          </DialogHeader>

          {isLoading && <p>Loading...</p>}
          {error && <p>Error loading book</p>}
          {book && (
            <div className="space-y-2 text-sm">
              <p>
                <strong>Title:</strong> {book.title}
              </p>
              <p>
                <strong>Author:</strong> {book.author}
              </p>
              <p>
                <strong>Genre:</strong> {book.genre}
              </p>
              <p>
                <strong>ISBN:</strong> {book.isbn}
              </p>
              <p>
                <strong>Copies:</strong> {book.copies}
              </p>
              <p>
                <strong>Availability:</strong>{" "}
                {book.available ? "Available" : "Not Available"}
              </p>
              <p>
                <strong>Description:</strong> {book.description}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookDetailsModal;
