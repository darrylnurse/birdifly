import Post from "../components/Post.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {supabase} from "../supabase.js";

export default function Home(){

  const navigate = useNavigate();

  const [posts, setPosts] = useState({});
  const [sort, setSort] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const {data} = await supabase
          .from("Posts")
          .select()
          .order((sort ? 'created_at' : 'likes'), {ascending: false});

      setPosts(data);
    }
    fetchPosts().catch(console.error);
  }, [sort]);

  const toggleSort = bool => {
    setSort(bool);
  }

  return (
      <div className={"bg-yellow-50 h-full p-8 flex flex-col gap-5 items-center"}>
        <div className={"flex flex-col gap-8 h-1/4 w-full lg:w-2/3"}>

          <div className={"w-full flex justify-center"}>
            <div className={"w-1/2 flex justify-center items-center text-2xl"}>
              <input
                  className={"text-center p-5 rounded-xl bg-yellow-200 w-full h-full"}
                  defaultValue={"What's chirping?"}
                  type={"text"}
              />
            </div>
          </div>

          <div className={"flex flex-row justify-between "}>
            <div className={"grid grid-cols-2 text-center gap-2"}>

              <button
                  onClick={() => toggleSort(false)}
                  className={"select-none px-3 p-1 bg-yellow-200 rounded-lg"}
              >
                Popular
              </button>

              <button
                  onClick={() => toggleSort(true)}
                  className={"select-none px-3 p-1 bg-yellow-200 rounded-lg"}
              >
                New
              </button>

            </div>

            <button
                onClick={() => navigate('/new')}
                className={"select-none px-10 p-1 bg-green-200 rounded-lg"}
            >
              New Post
            </button>

          </div>
        </div>

        <div className={"flex flex-col overflow-scroll no-scroll gap-4 h-3/4 w-full lg:w-2/3"}>
          {posts.length && posts.map(post => {
             return (
                 <Post key={post.id}
                       id={post.id}
                       name={post.name}
                       likes={post.likes}
                       image={post.image_link}
                       date={post.created_at}
                 />
             )
          })}
        </div>

      </div>
  )
}