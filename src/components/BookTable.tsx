import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IBook } from "@/types";
import {
  Delete,
  Edit,
  CheckCircle,
  XCircle,
  BookUser,
  ListCheck,
} from "lucide-react";
import { useState } from "react";
import BookDetailsModal from "./BookDetailsModal";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import BookUpdateModal from "./BookUpdateModal";
import { useDeleteBookMutation } from "@/redux/api/baseApi";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import BorrowBookModal from "./BorrowBookModal";
import { cn } from "@/lib/utils";

const BookTable = ({ books }: { books: IBook[] }) => {
  const [selectedBookId, setSelectedBookId] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [borrowOpen, setBorrowOpen] = useState(false);
  const [deleteBook] = useDeleteBookMutation();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Copies</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book._id} className="my-10">
              <TableCell className="font-medium py-4 md:py-6">
                {book.title}
              </TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>
                {book.genre.charAt(0).toUpperCase() +
                  book.genre.slice(1).toLowerCase()}
              </TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.copies}</TableCell>
              <TableCell>
                {book.copies > 0 ? (
                  <CheckCircle className="text-green-700 dark:text-green-500 w-4 h-4" />
                ) : (
                  <XCircle className="text-pink-700 w-4 h-4" />
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  {/* Edit with tooltip */}
                  <Tooltip>
                    <TooltipTrigger>
                      <Edit
                        className="text-cyan-700 dark:text-cyan-500 hover:scale-90 transition w-4 h-4 cursor-pointer"
                        onClick={() => {
                          setSelectedBookId(book._id);
                          setUpdateOpen(true);
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit Book</p>
                    </TooltipContent>
                  </Tooltip>

                  {/* Delete a book */}
                  <AlertDialog>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertDialogTrigger asChild>
                          <Delete className="text-pink-600 hover:scale-90 transition w-5 h-5 cursor-pointer" />
                        </AlertDialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>Delete Book</TooltipContent>
                    </Tooltip>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your book from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={async () => {
                            try {
                              await deleteBook(book._id).unwrap();
                              toast.success("Book deleted successfully!");
                            } catch (err) {
                              toast.error("Failed to delete the book.");
                            }
                          }}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  {/* View/Details with tooltip */}
                  <Tooltip>
                    <TooltipTrigger>
                      <BookUser
                        className="text-green-500 hover:scale-90 transition w-5 h-4 cursor-pointer"
                        onClick={() => {
                          setSelectedBookId(book._id);
                          setDetailsOpen(true);
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Book Description</p>
                    </TooltipContent>
                  </Tooltip>

                  {/* borrow book */}
                  <Tooltip>
                    <TooltipTrigger>
                      <ListCheck
                        className={cn(
                          "transition w-5 h-4",
                          book.copies > 0
                            ? "text-yellow-500 hover:scale-90 cursor-pointer"
                            : "text-gray-400 cursor-not-allowed"
                        )}
                        onClick={() => {
                          if (book.copies > 0) {
                            setSelectedBookId(book._id);
                            setBorrowOpen(true);
                          }
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Borrow Book</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <BookDetailsModal
        bookId={selectedBookId}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />

      <BookUpdateModal
        bookId={selectedBookId}
        open={updateOpen}
        onOpenChange={setUpdateOpen}
      />

      <BorrowBookModal
        bookId={selectedBookId}
        open={borrowOpen}
        onOpenChange={setBorrowOpen}
      />
    </>
  );
};

export default BookTable;
