import {useNavigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Post({ id, name, likes, image, date }){
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/details/${id}`)
  };

  return (
      <div onClick={handleClick} className={"cursor-pointer select-none bg-yellow-200 p-8 rounded-xl flex flex-row justify-between items-center px-5"}>
        <div className={"flex flex-row items-center gap-3"}>
          <div className={"bg-yellow-300"}>
            <img
                src={image}
                alt={"post image"}
                className={"size-20 rounded-lg"}
            />
          </div>
          <div className={"text-xl"}>{name}</div>
        </div>
        <div className={"flex flex-row gap-3"}>
          <div>{new Date(date).toDateString().slice(4)}</div>
          <div>{likes || 0} ♥</div>
        </div>
      </div>
  )
}