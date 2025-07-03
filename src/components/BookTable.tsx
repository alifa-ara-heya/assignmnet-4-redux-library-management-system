import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IBook } from "@/types";
import { Delete, Edit, CheckCircle, XCircle } from "lucide-react";

const BookTable = ({ books }: { books: IBook[] }) => {
  return (
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
            <TableCell>{book.genre}</TableCell>
            <TableCell>{book.isbn}</TableCell>
            <TableCell>{book.copies}</TableCell>
            <TableCell>
              {book.copies > 0 ? (
                <CheckCircle className="text-green-700 w-4 h-4" />
              ) : (
                <XCircle className="text-pink-700 w-4 h-4" />
              )}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <Edit
                  className="text-cyan-500 hover:scale-90 transition w-4 h-4 cursor-pointer"
                  //   onClick={() => handleEdit(book._id)}
                />
                <Delete
                  className="text-pink-500 hover:scale-90 transition w-5 h-5 cursor-pointer"
                  //   onClick={() => handleDelete(book._id)}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BookTable;
