import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IBook } from "@/types";
import { Delete, Edit, CheckCircle, XCircle, BookUser } from "lucide-react";
import { useState } from "react";
import BookDetailsModal from "./BookDetailsModal";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import BookUpdateModal from "./BookUpdateModal";
import { useDeletePostMutation } from "@/redux/api/baseApi";

const BookTable = ({ books }: { books: IBook[] }) => {
  const [selectedBookId, setSelectedBookId] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deletePost] = useDeletePostMutation();

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

                  {/* Delete with tooltip */}
                  <Tooltip>
                    <TooltipTrigger>
                      <Delete
                        className="text-pink-600 hover:scale-90 transition w-5 h-5 cursor-pointer"
                        onClick={() => deletePost(book._id)}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete Book</p>
                    </TooltipContent>
                  </Tooltip>

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
    </>
  );
};

export default BookTable;
