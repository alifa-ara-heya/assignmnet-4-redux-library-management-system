
import { createBrowserRouter } from "react-router";
import App from "../App";
import Books from "../pages/Books";

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
            }
        ]
    }
])

export default router;