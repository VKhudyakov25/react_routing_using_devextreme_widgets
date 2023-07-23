import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "devextreme/dist/css/dx.dark.css";

import Root from "./routes/root";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Inbox from "./routes/inbox";
import SentMail from "./routes/sent-mail";
import Spam from "./routes/spam";
import Trash from "./routes/trash";
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "sent-mail",
        element: <SentMail />,
      },

      {
        path: "inbox",
        element: <Inbox />,
      },
      {
        path: "spam",
        element: <Spam />,
      },
      {
        path: "trash",
        element: <Trash />,
      },
    ],
  },
  {
    path: "/test",
    element: <Inbox />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
