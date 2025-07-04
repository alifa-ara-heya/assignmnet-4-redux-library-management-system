import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useGetBookQuery, useUpdateBookMutation } from "@/redux/api/baseApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import type { BookModalProps } from "@/types";
import Loader from "./Loader";

const BookUpdateModal = ({ bookId, open, onOpenChange }: BookModalProps) => {
  //   console.log(bookId);

  const { data, isLoading, error } = useGetBookQuery(bookId, {
    skip: !bookId,
    /* pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true, */
  });

  const book = data?.data;

  //   console.log("Book", book);

  /* Problem 2: Form default values not showing
  🔍 Why?
  React Hook Form's defaultValues are set once on mount, and your book is fetched asynchronously. So: */

  const form = useForm({
    defaultValues: {
      title: book?.title,
      author: book?.author,
      genre: book?.genre,
      isbn: book?.isbn,
      description: book?.description,
      copies: book?.copies,
    },
  });
  // This runs before book is loaded ⇒ values are undefined.
  // Fix: Use reset() to populate values after fetch
  useEffect(() => {
    if (book) {
      form.reset({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description,
        copies: book.copies,
      });
    }
  }, [book]);

  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
  if (isUpdating) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Loader />
      </div>
    );
  }

  //   form.reset() is the correct way to update values after the form has been initialized.

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    if (!bookId) return;
    try {
      //   const payload = { bookId, bookData: formData };
      //   const res = await updateBook(payload).unwrap();
      await updateBook({ bookId, bookData: formData }).unwrap();
      onOpenChange(false);
      toast.success("Book Updated successfully");
      form.reset();
    } catch (error: any) {
      toast.error("Update failed:", error);
    }
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading book</p>}

      <Dialog open={open} onOpenChange={onOpenChange}>
        <form className="">
          {book && (
            <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Edit Book</DialogTitle>
                <DialogDescription>
                  Make changes to your book here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>

              {/* form */}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 w-full p-3"
                >
                  {/* title */}

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>📖 Title</FormLabel>
                        <FormControl>
                          <Input placeholder="title" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* author */}
                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>👤 Author</FormLabel>
                        <FormControl>
                          <Input placeholder="author" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* genre */}
                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>💠 Genre</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a genre" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="FICTION">Fiction</SelectItem>
                            <SelectItem value="NON_FICTION">
                              Non-Fiction
                            </SelectItem>
                            <SelectItem value="SCIENCE">Science</SelectItem>
                            <SelectItem value="HISTORY">History</SelectItem>
                            <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                            <SelectItem value="FANTASY">Fantasy</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  {/* isbn */}
                  <FormField
                    control={form.control}
                    name="isbn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>🔑 ISBN</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="ISBN" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* copies */}
                  <FormField
                    control={form.control}
                    name="copies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>📂 Copies</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            placeholder="Enter a number"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          )}
        </form>
      </Dialog>
    </div>
  );
};

export default BookUpdateModal;
