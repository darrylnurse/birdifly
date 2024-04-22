import {useNavigate} from "react-router-dom";
import {Suspense, lazy, useEffect, useState} from "react";
import {supabase} from "../supabase.js";
const Post = lazy(() => import("../components/Post.jsx"));

export default function Home(){

  const navigate = useNavigate();

  const [posts, setPosts] = useState({});
  const [sort, setSort] = useState(false);

  const [searchValue, setSearchValue] = useState("");

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

  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);

  return (
      <div className={"bg-yellow-50 h-full p-8 flex flex-col gap-5 items-center"}>
        <div className={"flex flex-col gap-8 h-1/4 w-full lg:w-2/3"}>

          <div className={"w-full flex justify-center"}>
            <div className={"relative w-1/2 flex justify-center items-center text-2xl"}>
              <input
                  className={"text-center p-5 rounded-xl bg-yellow-200 w-full h-full"}
                  placeholder={"What's chirping?"}
                  type={"text"}
                  onChange={event => setSearchValue(event.target.value)}
              />
              <div className={"absolute hover:scale-[105%] active:scale-[98%] right-5 cursor-pointer select-none"}>
                <img
                  alt={'binoculars'}
                  src={'/binoculars.png'}
                  className={"h-[30px] aspect-auto pointer-events-none"}

                /> {/*this actually does nothing but it looks cool loool*/}
              </div>
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

        <Suspense fallback={<div>Loading...</div>}> {/*straight up does nothing lol*/}
          <div className={"flex flex-col overflow-scroll no-scroll gap-4 h-3/4 w-full lg:w-2/3"}>
            {posts.length && posts.filter(post => {
              return (
                  searchValue.toLowerCase() === "" ? post : post.name
                      .toLowerCase()
                      .includes(searchValue)
              )
            }).map(post => {
               return (
                   <Post key={post.id}
                         id={post.id}
                         name={post.name}
                         likes={post.likes}
                         image={post.image_link}
                         date={post.created_at}
                         num_comments={post.comments.length}
                   />
               )
            })}
          </div>
        </Suspense>

      </div>
  )
}