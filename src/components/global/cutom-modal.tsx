import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useModal } from "@/provider/modal-provider";
import { useRouter } from "next/navigation";
import WorkflowForm from "../forms/workflow-form";

type Props = {
  title: string;
  description: string;
  defaultOpen?: boolean;
};

const CustomModal = ({ title, description, defaultOpen }: Props) => {
  const { isOpen, setClose } = useModal();
  const router = useRouter();

  const handleClose = () => {
    setClose();
  };

  return (
    <Drawer open={isOpen} onClose={handleClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center text-2xl">{title}</DrawerTitle>
          <div className="text-center flex flex-col items-center gap-4 h-90 overflow-hidden">
            {description}
            <WorkflowForm
              onClose={handleClose}
            />
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};


export default CustomModal;
