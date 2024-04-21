import {useParams} from "react-router-dom";
import Comment from "../components/Comment.jsx";
import {useEffect, useState} from "react";
import {supabase} from "../supabase.js";

export default function Detail(){

  const { id } = useParams();

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
      else if(data) setPost({
        name: data['name'],
        image_link: data['image_link'],
        text: data['text'],
        likes: data['likes'],
        comments: data['comments'],
      })
    }
    fetchPost().catch(console.error);
  }, [id]);

  return (
      <div className={"h-full bg-yellow-50 p-10 flex justify-center items-center"}>
        <div className={"bg-yellow-200 h-full rounded-xl p-6 w-full lg:w-1/2"}>

          <div className={"flex flex-row justify-between items-center h-[10%]"}>
            <div>{post.name}</div>
            <div>{post.likes}</div>
          </div>

          <div className={"h-[90%] flex flex-col gap-5"}>
            <div className={"flex flex-row gap-5 h-2/3"}>
              <div className={"w-2/3 bg-yellow-300 rounded-xl overflow-hidden"}>
                <img
                    alt={"bird image"}
                    src={post.image_link}
                    className={"w-full h-full object-cover"}
                />
              </div>
              <div className={"w-1/3 flex gap-5 flex-col"}>
                <div className={"h-1/6 bg-yellow-300 rounded-lg"}>
                  <button className={"w-full h-full text-xl"}>Edit</button>
                </div>
                <div className={"h-5/6 bg-yellow-50 p-5 rounded-lg"}>{post.text}</div>
              </div>
            </div>

            <div className={"flex flex-row h-1/3 gap-5"}>
              <button className={"w-[10%] h-full bg-yellow-50 rounded-xl flex justify-center items-center text-xl"}> + </button>
              <div className={"w-[90%] flex flex-col gap-5 overflow-scroll no-scroll"}>
                {post.comments && post.comments.map((comment, index) => {
                  return (
                      <Comment key={index} text={comment}/>
                  )
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
  )
}