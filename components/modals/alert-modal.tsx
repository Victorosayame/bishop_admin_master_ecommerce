"use client"

import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";

//alert modal to delete store

interface AlertModalProps {
    isOpen: boolean,
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}
export const AlertModal:React.FC<AlertModalProps> = ({
    isOpen, onClose, onConfirm, loading
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) {
        return null;
    }

    return (
        <Modal
          title="Are you sure?"
          description="This action cannot be undone."
          isOpen={isOpen}
          onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={onClose}
                  className="border border-gray-300 rounded"
                >
                    Cancel
                </Button>
                <Button
                  disabled={loading}
                  variant="destructive"
                  onClick={onConfirm}
                  className="bg-red-1 text-white rounded hover:bg-red hover:text-white"
                >
                    Continue
                </Button>
            </div>
        </Modal>
    )
}