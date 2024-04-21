import {useEffect, useState} from "react";
import {supabase} from "../supabase.js";
import {useNavigate} from "react-router-dom";

export default function NewPost(){

  const navigate = useNavigate();

  const [bird, setBird] = useState({
    name: "",
    image_link: "",
    text: "",
  })

  useEffect(() => {
    console.log(bird);
  }, [bird]);

  const submitPost = async event => {
    event.preventDefault();

    if(bird.name.length === 0){
      alert("Please at least enter a name.");
      return;
    }

    await supabase
        .from("Posts")
        .insert({
          name: bird.name,
          image_link: bird.image_link,
          text: bird.text,
          likes: 0,
          comments: [],
        })
        .select()
        .then(() => navigate('/'));
  }

  const handleChange = event => {
    const {name, value} = event.target;
    setBird( prev => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  return (
      <div className={"bg-yellow-50 h-full p-8 flex flex-col justify-start items-center"}>

        <div className={"text-3xl h-[20%] flex justify-center items-center"}>
          New Post
        </div>

        <form className={"w-[90%] lg:w-1/2 h-[80%] flex flex-col justify-evenly text-xl "}>

          <div>
            <label htmlFor={"name"}>Bird Name</label><br/>
            <input
                type={"text"}
                name={"name"}
                onChange={handleChange}
                autoComplete={'off'}
                className={"w-full bg-yellow-200 min-h-[50px] rounded-lg p-3"}
            />
          </div>

          <div>
            <label htmlFor={"image_link"}>Image Link</label><br/>
            <input
                type={"url"}
                name={"image_link"}
                onChange={handleChange}
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
                placeholder={"Tell us about the bird!"}
                maxLength={500}
            />
          </div>

          <div className={"w-full flex justify-center items-center"}>
            <input
                type={"submit"}
                value={"Post"}
                onClick={submitPost}
                className={"px-9 rounded-lg select-none cursor-pointer p-3 bg-yellow-200"}
            />
          </div>

        </form>
      </div>
  )
}