import React, { ReactElement, ReactNode } from 'react';

export type ModalButtonType = 'normal' | 'confirm' | 'abort';

export type ModalIdType = string;

export interface ModalControlButtonInfo {
  icon: string;
  onClick?: () => void;
}

export interface ModalActionButtonInfo {
  name: string;
  type: ModalButtonType;
  onClick?: () => void;
}

export interface ModalProps {
  ref: React.Ref<HTMLDialogElement>
  children: ReactElement;
  buttons?: ModalActionButtonInfo[];
  onClose?: () => void;
}

export type ModalComponent = (props: ModalProps) => ReactNode
