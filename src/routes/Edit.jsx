import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {supabase} from "../supabase.js";

export default function Edit(){

  const { id } = useParams();
  const navigate = useNavigate();

  const [bird, setBird] = useState({
    name: "",
    text: "",
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
        setBird({
          name: data['name'],
          text: data['text'],
        })
      }
    }
    fetchPost().catch(console.error);
  }, [id]);

  const handleChange = event => {
    const {name, value} = event.target;
    setBird( prev => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const submitPost = async event => {
    event.preventDefault();

    if(bird.name.length === 0){
      alert("Please at least enter a name.");
      return;
    }

    await supabase
        .from("Posts")
        .update({
          name: bird.name,
          text: bird.text,
        })
        .eq('id', id)
        .then(() => navigate(`/details/${id}`));
  }

  const deletePost = async event => {
    event.preventDefault();

    if(!confirm("Are you sure you want to delete this wonderful bird?")){
      return;
    }

    await supabase
        .from("Posts")
        .delete()
        .eq('id', id)
        .then(() => navigate('/'));
  }

  return (
      <div className={"bg-yellow-50 h-full p-8 flex flex-col justify-start items-center"}>

        <div className={"relative px-8 w-full h-[20%] flex justify-between items-center"}>
          <button className={" p-3 px-7 bg-red-300 rounded-xl invisible"}>Delete</button>
          <div className={"text-3xl"}>Edit Post</div>
          <button
              className={"p-3 px-7 bg-red-300 rounded-xl"}
              onClick={deletePost}
          >
            Delete
          </button>
        </div>

        <form className={"w-[90%] lg:w-1/2 h-[80%] flex flex-col justify-evenly text-xl "}>

          <div>
            <label htmlFor={"name"}>Bird Name</label><br/>
            <input
                type={"text"}
                name={"name"}
                onChange={handleChange}
                value={bird.name}
                autoComplete={'off'}
                className={"w-full bg-yellow-200 min-h-[50px] rounded-lg p-3"}
            />
          </div>

          <div>
            <label htmlFor={"text"}>Information</label><br/>
            <textarea
                name={"text"}
                onChange={handleChange}
                autoComplete={'off'}
                className={"w-full p-3 bg-yellow-200 min-h-[100px] rounded-lg"}
                value={bird.text}
                placeholder={"What's different about the bird?"}
                maxLength={500}
            />
          </div>

          <div className={"w-full flex justify-center items-center"}>
            <div className={"w-1/3 text-center gap-3 grid grid-cols-2 justify-center items-center"}>
              <input
                  type={"submit"}
                  value={"Change"}
                  onClick={submitPost}
                  className={"order-1 px-9 rounded-lg select-none cursor-pointer p-3 bg-yellow-200"}
              />

              <div
                  onClick={() => navigate(`/details/${id}`)}
                  className={"order-0 px-9 rounded-lg select-none cursor-pointer p-3 bg-yellow-200"}
              >
                Back
              </div>

            </div>
          </div>

        </form>
      </div>
  )
}