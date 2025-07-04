
import { createBrowserRouter } from "react-router";
import App from "../App";
import Books from "../pages/Books";
import AddBook from "@/pages/AddBook";
import BorrowSummary from "@/pages/BorrowSummary";

const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                index: true,
                Component: Books
            },
            {
                path: 'books',
                Component: Books
            },
            {
                path: 'create-book',
                Component: AddBook
            },
            {
                path: 'borrow-summary',
                Component: BorrowSummary
            }

        ]
    }
])

export default router;