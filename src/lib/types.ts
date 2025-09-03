import { RowDataPacket } from "mysql2";
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

export type DokterProps = {
  id: string;
  nama?: string;
  nik?: string;
  npwp?: string;
  alamat_ktp?: string;
  alamat?: string;
  tanggal_lahir?: string;
  tempat_lahir?: string;
  email?: string;
  hp?: string;
  telp?: string;
  jk?: number;
  status?: number;
  img_path?: string | null;
  img_name?: string | null;
  imageDeleted?: boolean;
  spesialis_id?: number;
  userId?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

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

export interface KategoriProps {
  id: string;
  name?: string | null;
  warna_text?: string | null;
  warna_bg?: string | null;
}

export type DBBlogType = {
  id?: string;
  title?: string;
  content?: string;
  slug?: string;
  tgl?: string;
  jam?: string;
  timelimit?: string;
  katId?: number;
  blogStatus?: number;
  userId?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export type RBlogPictType = {
  blogId?: string;
  path?: string;
  fileName?: string;
  alt?: string;
  priority?: number;
  existing?: boolean;
};

export type RBlogKatType = {
  blogId?: string;
  kategoriId?: number;
  priority?: number;
};

export interface Category {
  nama: string;
  warna: string;
  warna_text: string;
}

export interface BlogWithCategories extends RowDataPacket {
  kategoriesArray: Category[];
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

export type JadwalType = {
  dokter?: string;
  days?: number;
  jam_mulai?: string;
  jam_keluar?: string;
};

export type UserProps = {
  id?: string;
  nama?: string;
  email?: string;
  username?: string;
  telp?: string;
};

export type MenuType = {
  id?: string;
  nama?: string;
  url?: string;
  icon?: string;
  sub?: number;
  parent?: string;
  nourut?: number;
  active?: number;
};

export type FacilityType = {
  id: string;
  title: string;
  content: string;
  reverse: number;
  shadow: number;
  path: string;
  src: string;
  alt: string;
  sub: number;
  parent: string;
  nourut: number;
};
