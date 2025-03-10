"use client";
import WorkflowForm from "@/components/forms/workflow-form";
import CustomModal from "@/components/global/cutom-modal";
import { Button } from "@/components/ui/button";
import { useModal } from "@/provider/modal-provider";
import { PlusIcon } from "lucide-react";
import React from "react";

const WorkflowButton = () => {
  const { setOpen, setClose } = useModal();

  const handleClick = () => {
    setOpen(
      <CustomModal
        title="Create a workflow."
        description="Let's automate tasks using workflows."
      >
        <WorkflowForm/>
        
      </CustomModal>
    );
  };
  return (
    <div>
      <Button onClick={handleClick} className="cursor-pointer">
        <PlusIcon />
      </Button>
    </div>
  );
};

export default WorkflowButton;
