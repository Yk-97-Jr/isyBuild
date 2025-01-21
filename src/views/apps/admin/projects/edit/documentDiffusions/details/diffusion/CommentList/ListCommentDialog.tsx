"use client";

import React from "react";

import DialogTitle from "@mui/material/DialogTitle";

import Dialog from "@mui/material/Dialog";
import { DialogActions } from "@mui/material";

import DialogCloseButton from "@/components/dialogs/DialogCloseButton";
import CommentsSectionList from "./RetrieveCommentsDialog";

type AddFinanceSituationContentProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch: () => void;
  id: number;
};

const ListCommentContent = ({
  open,
  setOpen,
  id,
}: AddFinanceSituationContentProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      scroll="paper"
      sx={{ "& .MuiDialog-paper": { overflow: "hidden" }, overflowY: "hidden" }}
    >
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>
      <DialogTitle
        variant="h4"
        className="flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16"
      >
        Commenter list diffusion des document
      </DialogTitle>
      <form>
        <DialogActions className="justify-center pbs-0 sm:pbe-16 sm:pli-16">
          <CommentsSectionList commentId={id} />
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ListCommentContent;
