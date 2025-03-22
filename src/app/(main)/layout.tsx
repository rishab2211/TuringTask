import Infobar from "@/components/Infobar";
import MenuOptions from "@/components/sidebar/main";
import { ReactNode } from "react";

type Props = { children: ReactNode };

const Layout = (props: Props) => {
  return (
    <div className=" flex overflow-hidden h-screen p-4 ">
      <MenuOptions />
      <div className=" w-full ">
        <Infobar/>
        {props.children}</div>
    </div>
  );
};

export default Layout;
