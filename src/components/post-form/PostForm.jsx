import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appWriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const navigate = useNavigate();
  const { register, control, handleSubmit, watch, setValue, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const userData = useSelector((state) => state.auth.userData);
  // console.log("userDataPOSTFORM", userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appWriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appWriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appWriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      console.log("there is a dbpoost", dbPost);
      if (dbPost) {
        navigate(`/post/${post.$id}`);
      }
    } else {
      const file = data.image[0]
        ? await appWriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        const fileID = file.$id;
        data.featuredImage = fileID;
        const dbPost = await appWriteService.createPost({
          ...data,
          userId: userData.$id,
        });
        // we did this object spreading cuz in our forms we won't have access to userData
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");

    return "";
  }, []);

  // This code uses the `React.useEffect` hook to automatically update
  // the "slug" field in a form whenever the "title" field changes.
  // Inside the effect, it subscribes to changes in the form fields using a `watch` function
  // (commonly provided by form libraries like React Hook Form). The `watch` function takes a callback
  // that receives the current form values and the name of the field that changed.

  // When the "title" field changes, the callback triggers the `slugTransform` function on the new title value.
  // This function likely formats the title into a URL-friendly slug (e.g., lowercasing, replacing spaces with hyphens).
  //  The result is then set as the new value for the "slug" field using the `setValue` function, which may also trigger
  // validation if specified.

  // The effect also returns a cleanup function that unsubscribes from the `watch` subscription when
  // the component unmounts or when any dependencies (`watch`, `slugTransform`, or `setValue`) change.
  // This prevents memory leaks and ensures that the subscription is always up to date. Overall, this pattern
  //  keeps the "slug" field in sync with the "title" field in real time as the user types.

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);
  // watch is used to watch the changes in the form fields which in our case is title
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap text-white">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appWriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
