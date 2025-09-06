import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export type ShareButtonProps = {
  title?: string;
  url?: string;
};

interface BreadcrumbItem {
  text: string;
  href: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export interface UserLoginType {
  id?: string;
  nama?: string;
  username: string;
  pass: string;
  email?: string;
  stat?: number;
  length?: number;
}

export type UserLoginResponse = UserLoginType[][];

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export interface StateProps {
  status?: number;
  fields?: string;
  message?: string;
  values?: Record<string, string | number | unknown>;
}

export interface SessionData {
  id: string;
  nama: string;
  rid: string;
  pict: string;
}

export interface Payload {
  sessionData: SessionData;
  expires: Date | string;
  iat?: number;
  exp?: number;
  [key: string]: unknown;
}

export interface OptionStateProps {
  value: number | string;
  label: string;
}

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
}

export interface FormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export interface TwibbonProps {
  title: string;
  desc: string;
  slug: string;
  fileName: string;
  filePath: string;
  thumbnail: string;
}
