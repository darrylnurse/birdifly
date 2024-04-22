import Comment from "../components/Comment.jsx";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {supabase} from "../supabase.js";

export default function Comments(){

  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      const {data, error} = await supabase
          .from("Posts")
          .select()
          .eq('id', id)
          .single();

      if(error) console.error();
      else if(data) setComments(data['comments']);
    }
    fetchComments().catch(console.error);
  }, [id]);

  return (
      <div className={"flex flex-row h-1/3 gap-3"}>
        <button
            className={"w-[10%] h-full bg-yellow-50 rounded-xl flex justify-center items-center text-xl"}
            onClick={() => navigate('new-comment')}
        >
          +
        </button>
        <div className={"w-[90%] flex flex-col gap-3 overflow-scroll no-scroll"}>
          {comments.length !== 0 ?
              comments.map((comment, index) => {
                return (
                    <Comment key={index} text={comment}/>
                )
              }) :
              <div
                  className={"select-none w-full h-full flex items-center justify-center text-xl italic bg-yellow-50 rounded-xl"}
              >
                No comments.
              </div>}
        </div>
      </div>
  )
}