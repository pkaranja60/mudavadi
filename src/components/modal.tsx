import { MouseEvent, ReactNode } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { X } from "lucide-react";

interface ModalProps {
    isVisible: boolean;
    onClose: () => void;
    children: ReactNode;
  }

export default function Modal({ isVisible, onClose, children }: ModalProps) {
  if (!isVisible) return null;

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "wrapper") onClose();
  };
  return (
    <div
      id="wrapper"
      className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-0 flex justify-center items-center"
      onClick={handleClose}
    >
      <div className="w-[620px] flex flex-col">
        <Button
          variant="ghost"
          className="text-red-500 text-xl p-1.5 place-self-end"
          onClick={() => onClose()}
        >
          <X />
        </Button>
        <Card>{children}</Card>
      </div>
    </div>
  );
}
