import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { useModal } from "@/provider/modal-provider";
import { Children, ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

const CustomModal = ({ title, description, children, defaultOpen }: Props) => {
  const { isOpen, setClose } = useModal();

  const handleClose = () => {
    setClose();
  };

  return (
    <Drawer open={isOpen} onClose={handleClose} >
      <DrawerContent className="no-scrollbar">
        <DrawerHeader>
          <DrawerTitle className="text-center text-2xl">{title}</DrawerTitle>
          <div className="text-center flex flex-col items-center gap-4 h-90 overflow-scroll">
            {description}
            {children}
          </div>
        </DrawerHeader>
        <DrawerFooter className="flex flex-col gap-4 bg-background border-t-[1px] border-t-muted">
          <Button
            variant="default"
            className="hover:bg-slate-800 border hover:text-white"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomModal;
