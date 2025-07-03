import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IBook } from "@/types";
import { Delete, Edit } from "lucide-react";

const BookTable = ({ books }: { books: IBook[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
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
            <TableCell className="font-medium py-4">{book.title}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{book.genre}</TableCell>
            <TableCell>{book.isbn}</TableCell>
            <TableCell>{book.copies}</TableCell>
            <TableCell>
              {book.copies > 0 ? "Available" : "Unavailable"}
            </TableCell>
            <TableCell className="flex justify-between">
              <Edit className="text-cyan-500 hover:scale-80 transition transform w-4 h-4" />
              <Delete className="text-pink-500 hover:scale-80 transition transform w-5 h-5" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BookTable;
