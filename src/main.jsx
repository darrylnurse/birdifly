import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./routes/Root.jsx";
import Home from "./routes/Home.jsx";
import Detail from "./routes/Detail.jsx";
import NewPost from "./routes/NewPost.jsx";
import Edit from "./routes/Edit.jsx";
import Comments from "./routes/Comments.jsx";
import NewComment from "./routes/NewComment.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'details/:id',
        element: <Detail />,
        children: [
          {
            index: true,
            element: <Comments/>
          },
          {
            path: 'new-comment',
            element: <NewComment/>
          }
        ]
      },
      {
        path: 'new',
        element: <NewPost />,
      },
      {
        path: 'edit/:id',
        element: <Edit />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
