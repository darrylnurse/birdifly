import {Outlet, useNavigate} from "react-router-dom";

export default function Root(){

  const navigate = useNavigate();

  return (
      <div className={"h-screen flex flex-col"}>
        <div className={"p-8 h-[15%] flex flex-row justify-between items-center bg-yellow-200"}>
          <div className={"text-2xl font-bold"}>Birdifly</div>

          <div>
            {""}
          </div>

          <div
              className={"text-xl select-none cursor-pointer"}
              onClick={() => navigate('/')}
          >
            Home
          </div>

        </div>
        <div className={"h-[85%]"}>
          <Outlet />
        </div>
      </div>
  )
}