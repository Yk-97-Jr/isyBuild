"use client"

import type { ComponentType} from 'react';
import { useState } from 'react'

import { useRouter } from "next/navigation";

type OpenDialogOnElementClickProps = {
  element: ComponentType<any>;
  dialog: ComponentType<any>;
  elementProps?: any;
  dialogProps?: any;
  redirectTo?: string;
};

const OpenDialogOnElementClick = ({
  element: Element,
  dialog: Dialog,
  elementProps = {},
  dialogProps = {},
  redirectTo,
}: OpenDialogOnElementClickProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleOnClick = (e: MouseEvent) => {
    if (elementProps?.onClick) {
      elementProps.onClick(e);
    }

    if (redirectTo) {
      router.push(redirectTo);
    } else {
      setOpen(true); // Open dialog
    }
  };

  return (
    <>
      <Element onClick={handleOnClick} {...elementProps} />
      <Dialog open={open} setOpen={setOpen} {...dialogProps} />
    </>
  );
};

export default OpenDialogOnElementClick;
