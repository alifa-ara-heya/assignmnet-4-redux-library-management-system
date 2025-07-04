import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, type SubmitHandler } from "react-hook-form";
import AddBookImg from "@/assets/add-book.jpg";
import { useCreateBookMutation } from "@/redux/api/baseApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import type { IBook } from "@/types";

const AddBook = () => {
  type TBookForm = Omit<IBook, "_id" | "createdAt" | "updatedAt">;
  const navigate = useNavigate();

  const form = useForm<TBookForm>({
    defaultValues: {
      title: "",
      author: "",
      genre: "FICTION", // set a default valid option
      isbn: "",
      description: "",
      copies: 1,
      available: true,
    },
  });

  const [createBook] = useCreateBookMutation();

  const onSubmit: SubmitHandler<TBookForm> = async (data) => {
    const bookData = {
      ...data,
      available: Number(data.copies) > 0,
    };

    try {
      await createBook(bookData).unwrap();
      form.reset();
      toast.success("Successfully Added The Book");
      navigate("/");
    } catch (error) {
      console.error("Error creating book", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-2 md:gap-10 items-center my-10">
      <div className=" my-10 md:w-1/2 w-full">
        <img
          src={AddBookImg}
          alt="Add a Book Banner"
          className="w-full object-cover rounded-xl shadow-blue-950 shadow-2xl h-[200px] sm:h-[300px] md:h-[400px]"
        />
      </div>

      <div className="w-full md:w-1/2 border shadow-xl shadow-blue-200 p-6 md:my-10 backdrop-blur-md border-white/10 rounded-xl">
        <h1 className="font-bold text-2xl text-center py-6">Add a Book</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-xl mx-auto"
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
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FICTION">Fiction</SelectItem>
                      <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
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

            {/* availability */}
            {/*  <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>▶️ Availability</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    // defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a availability" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">True</SelectItem>
                      <SelectItem value="false">False</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            /> */}

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddBook;
