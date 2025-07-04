import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";

const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery(undefined);

  if (isLoading) return <p className="text-center mt-10">Loading summary...</p>;
  if (isError)
    return (
      <p className="text-red-500 text-center mt-10">Failed to fetch data.</p>
    );

  const summary = data?.data || [];

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">📚 Borrow Summary</h1>
      {summary.length === 0 ? (
        <p className="text-center">No books have been borrowed yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full  border border-gray-200 dark:border-gray-700 rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                <th className="py-3 px-4 border-b">Title</th>
                <th className="py-3 px-4 border-b">ISBN</th>
                <th className="py-3 px-4 border-b">Total Quantity Borrowed</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((item: any, index: number) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="py-2 px-4 border-b">{item.book?.title}</td>
                  <td className="py-2 px-4 border-b">{item.book?.isbn}</td>
                  <td className="py-2 px-4 border-b">{item.totalQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BorrowSummary;
