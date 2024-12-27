import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

export type EditMeetingDialogProps = {
  open: boolean;
};

export const EditMeetingDialog: React.FC<EditMeetingDialogProps> = ({
  open,
}) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>New meeting</Dialog.Title>
          <Dialog.Description>
            <form>
              <input type="text" placeholder="Title" />
            </form>
          </Dialog.Description>
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
