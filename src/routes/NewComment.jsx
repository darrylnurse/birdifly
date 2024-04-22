import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {supabase} from "../supabase.js";

export default function NewComment(){

  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [fetchedComments, setFetchedComments] = useState([]);
  const { id } = useParams();

  const handleChange = event => {
    setComment(event.target.value);
  }

  useEffect(() => {
    const fetchComments = async () => {
      const {data, error} = await supabase
          .from("Posts")
          .select()
          .eq('id', id)
          .single();

      if(error) console.error();
      else if(data) setFetchedComments(data['comments']);
    }
    fetchComments().catch(console.error);
  }, [id]);

  const postComment = async () => {
    await supabase
        .from("Posts")
        .update({comments: [...fetchedComments, comment]})
        .eq('id', id)
        .then(() => navigate(`/details/${id}`));
  }

  return (
      <div className={"w-full gap-3 h-full flex flex-row"}>
        <form className={"w-[90%]  rounded-xl focus-within:border-black h-full  "}>
          <textarea
              name={"comment"}
              className={"w-full h-full no-scroll resize-none bg-yellow-50 p-12 rounded-xl flex text-center"}
              placeholder={"Be nice!"}
              onChange={handleChange}
          />
        </form>
        <button
            className={"bg-yellow-400 rounded-xl w-[10%] flex justify-center items-center"}
            onClick={postComment}
        >
          Comment
        </button>
      </div>
  )
}