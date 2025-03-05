import { ReactNode } from "react";

type Props = { children: ReactNode };

const Layout = (props: Props) => {
  return (
    <div className=" border-l-[1px] border-t-[1px] pb-20 h-screen rounded-l-3xl  border-muted-foreground/20 overflow-hidden ">
      {props.children}
    </div>
  );
};

export default Layout;
