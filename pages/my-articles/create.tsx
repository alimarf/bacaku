import Head from "next/head";
import Navbar from "@/components/Navbar";

import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";

import ThumbnailPicker from "@/components/ThumbnailPicker";
import { useRef } from "react";
import Link from "next/link";
import Category from "@/components/Category";

const CreateArticleSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  thumbnail: Yup.mixed().nullable().required("Thumbnail is required"),
  categoryId: Yup.number().nullable().required("Category is required"),
});

export default function CreateArticlePage() {
  const refContentInput = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      thumbnail: null,
      categoryId: null,
    },
    validationSchema: CreateArticleSchema,
    validateOnMount: true,
    onSubmit: () => {
      alert("Submitted !");
    },
  });

  const handleContetnInputGrow = () => {
    if (!refContentInput.current) return;

    refContentInput.current.style.height = "auto";
    refContentInput.current.scrollHeight + "px";
  };

  const categories = [...Array(10)].map((_, index) => {
    return {
      id: index + 1,
      slug: "technology",
      name: "Technology",
    };
  });

  const hasError =
    !!formik.errors.title ||
    !!formik.errors.content ||
    !!formik.errors.thumbnail ||
    !!formik.errors.categoryId;

  return (
    <div>
      <Head>
        <title>Create Article | Bacaku</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <Navbar
        hasSearchInput={false}
        hasSubmitButton={true}
        isSubmitDisabled={hasError}
        submitLabel="Publish"
        onClickSubmit={formik.handleSubmit}
      />

      <div className="w-[720px] mx-auto py-24">
        <input
          name="title"
          className="font-sans font-bold text-5xl placeholder-slate-200 text-slate-900 w-full outline-none mb-12"
          placeholder="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
        />

        <ThumbnailPicker
          onPick={(file) => formik.setFieldValue("thumbnail", file)}
        />
        <textarea
          ref={refContentInput}
          className="w-full outline-none mt-12 font-serif text-slate-900 placeholder-slate-400 resize-none"
          placeholder="Write an arcticle here..."
          name="content"
          value={formik.values.content}
          onChange={formik.handleChange}
          onInput={handleContetnInputGrow}
        />

        <div className="pt-12 border-t mt-40 border-slate-200">
          <p className="font-sans text-slate-900 text-sm mb-4">
            Choose a Category
          </p>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Category
                key={category.id}
                label={category.name}
                isSelected={formik.values.categoryId === category.id}
                onClick={() => formik.setFieldValue("categoryId", category.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
