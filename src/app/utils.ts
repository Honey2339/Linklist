import { z } from "zod";

export const UserDataSchema = z.object({
  userId: z.string(),
  displayName: z
    .string()
    .min(3, { message: "Display name must be atleast 3 characters long" }),
  location: z
    .string()
    .min(5, { message: "Location must be atleast 5 characters long" }),
  bio: z
    .string()
    .min(10, { message: "Bio must be atleast 10 characters long" }),
  avatar: z.string().nullable(),
  banner: z.string().nullable(),
  linkedIn: z.string().nullable(),
  youtube: z.string().nullable(),
  github: z.string().nullable(),
  instagram: z.string().nullable(),
});

export type UserData = z.infer<typeof UserDataSchema>;

export const initialUserData: UserData = {
  userId: "",
  displayName: "",
  location: "",
  bio: "",
  avatar: "",
  banner: "",
  linkedIn: null,
  youtube: null,
  github: null,
  instagram: null,
};

export interface UserProjects {
  title: string | null | undefined;
  description: string | null | undefined;
  link: string | undefined;
  deleteProject: () => Promise<void>;
}

export const userProjectsSchema = z.object({
  title: z.string().min(3, { message: "Title must have atleast 3 characters" }),
  description: z
    .string()
    .min(4, { message: "Description must have atleast 3 characters" }),
  link: z.string(),
});

export type UserProjectsType = z.infer<typeof userProjectsSchema>;

export const initialUserProjectData: UserProjectsType = {
  title: "",
  description: "",
  link: "",
};
