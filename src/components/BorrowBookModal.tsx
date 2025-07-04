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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useBorrowBookMutation, useGetBookQuery } from "@/redux/api/baseApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import type { BookModalProps, IBorrow } from "@/types";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";

const BorrowBookModal = ({ bookId, open, onOpenChange }: BookModalProps) => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetBookQuery(bookId, {
    skip: !bookId,
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const book = data?.data;

  const form = useForm<Omit<IBorrow, "book">>({
    defaultValues: {
      quantity: 1,
      dueDate: undefined,
    },
  });

  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();

  const onSubmit: SubmitHandler<Omit<IBorrow, "book">> = async (data) => {
    if (!bookId) return;
    const borrowData: IBorrow = {
      ...data,
      book: bookId,
    };

    try {
      await borrowBook(borrowData).unwrap();
      toast.success("Successfully Borrowed The Book");
      form.reset();
      onOpenChange(false); // close modal
      navigate("/borrow-summary");
    } catch (error) {
      console.error("error borrowing book", error);
      toast.error("Borrowing failed");
    }
  };

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {book && (
        <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Borrow Book</DialogTitle>
            <DialogDescription>
              Choose how many copies you want and set a due date.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 p-3"
            >
              {/* Displayed book info (not in form state) */}
              <div className="text-sm text-muted-foreground space-y-3">
                <p>
                  <span className="font-medium text-foreground">📖 Title:</span>{" "}
                  {book.title}
                </p>
                <p>
                  <span className="font-medium text-foreground">
                    👤 Author:
                  </span>{" "}
                  {book.author}
                </p>
                <p>
                  <span className="font-medium text-foreground">
                    📂 Copies Available:
                  </span>{" "}
                  {book.copies}
                </p>
              </div>

              {/* Quantity input */}
              <FormField
                control={form.control}
                name="quantity"
                rules={{
                  required: true,
                  min: 1,
                  max: book.copies,
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>📚 Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        min={1}
                        max={book.copies}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Due date input */}
              <FormField
                control={form.control}
                name="dueDate"
                rules={{ required: "Due date is required" }}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                            date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isBorrowing}>
                  {isBorrowing ? "Borrowing..." : "Borrow Book"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default BorrowBookModal;
