import {Outlet, useNavigate, useParams} from "react-router-dom";
import Comment from "../components/Comment.jsx";
import {useEffect, useState} from "react";
import {supabase} from "../supabase.js";

export default function Detail(){

  const { id } = useParams();
  const navigate = useNavigate();

  const [likes, setLikes] = useState(0);
  const [post, setPost] = useState({
    name: "",
    image_link: "",
    text: "",
    likes: 0,
    comments: [],
  })

  useEffect(() => {
    const fetchPost = async () => {
      const {data, error} = await supabase
          .from("Posts")
          .select()
          .eq('id', id)
          .single();
      
      if(error) console.error();
      else if(data) {
        setPost({
          name: data['name'],
          image_link: data['image_link'],
          text: data['text'],
          comments: data['comments'],
        })
        setLikes(data['likes']);
      }
    }
    fetchPost().catch(console.error);
  }, [id]);

  const increaseLikes = async () => {
    const newLikes = likes + 1;
    setLikes(newLikes);

    await supabase
        .from("Posts")
        .update({ likes: newLikes })
        .eq('id', id);
  }

  return (
      <div className={"h-full bg-yellow-50 p-10 flex justify-center items-center"}>
        <div className={"bg-yellow-200 h-full rounded-xl p-6 w-full lg:w-1/2"}>

          <div className={"flex text-xl flex-row justify-between items-center h-[10%]"}>
            <div>{post.name}</div>
            <div
                className={"hover:scale-[105%] active:scale-[98%] select-none cursor-pointer"}
                onClick={increaseLikes}
            >
              {likes} ♥
            </div>
          </div>

          <div className={"h-[90%] flex flex-col gap-3"}> {/*this gap can cause overflow*/}
            <div className={"flex flex-row gap-3 h-2/3"}>

              <div className={"w-2/3 bg-yellow-300 rounded-xl overflow-hidden"}>
                <img
                    alt={"bird image"}
                    src={post.image_link || '/bird.png'}
                    className={"w-full object-cover"}
                    onError={({currentTarget}) => {
                      currentTarget.onerror = null;
                      currentTarget.src = '/bird.png';
                    }}
                />
              </div>

              <div className={"w-1/3 flex gap-3 flex-col"}>
                <div className={"h-1/6 bg-yellow-300 rounded-lg"}>
                  <button
                      className={"w-full h-full text-xl"}
                      onClick={() =>  navigate(`/edit/${id}`)}
                  >
                    Edit
                  </button>
                </div>
                <div className={"h-5/6 bg-yellow-50 p-5 rounded-lg"}>{post.text}</div>
              </div>

            </div>

            <Outlet />

          </div>

        </div>
      </div>
  )
}