import Head from "next/head";
import Navbar from "@/components/Navbar";

import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";

import PhotoPicker from "@/components/PhotoPicker";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Category from "@/components/Category";
import TextInput from "@/components/TextInput";

type FormValues = {
  fullname: string;
  photo: File | null;
};

const MyProfileSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(8, "Full Name should have at least 8 characters")
    .max(30, "Full Name should have at least 30 characters")
    .required("Fullname is required"),
});

export default function MyProfilePage() {
  const refContentInput = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const initialValues: FormValues = {
    fullname: "",
    photo: null,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: MyProfileSchema,
    validateOnMount: true,
    onSubmit: () => {
      alert("Saved !");
    },
  });

  const handleContetnInputGrow = () => {
    if (!refContentInput.current) return;

    refContentInput.current.style.height = "auto";
    refContentInput.current.style.height =
      refContentInput.current.scrollHeight + "px";
  };

  useEffect(() => {
    formik.setValues({
      fullname: user.fullname,
      photo: null,
    });
  }, []);

  const user = {
    fullname: "John Doe",
    photo: "images/dummy-avatar.png",
  };

  return (
    <div>
      <Head>
        <title>My Profile | Bacaku</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <Navbar
        hasSearchInput={false}
        hasSubmitButton={true}
        isSubmitDisabled={!!formik.errors.fullname}
        submitLabel="Save"
        onClickSubmit={formik.handleSubmit}
      />

      <div className="w-[400px] mx-auto py-24 flex flex-col items-center">
        <PhotoPicker
          preview={user.photo}
          onPick={(file) => formik.setFieldValue("photo", file)}
        />
        <div className="h-16" />
        <TextInput
          name="fullname"
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formik.values.fullname}
          hasError={!!formik.errors.fullname}
          errorMessage={formik.errors.fullname}
          onChange={formik.handleChange}
        />
      </div>
    </div>
  );
}
