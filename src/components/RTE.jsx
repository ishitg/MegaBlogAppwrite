import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "../conf/conf";
// control comes from react-hook-form and this is responsible for taking this component's state and passing it to the form
// we'll pass the control when we use this component in the form
export default function RTE({ name, control, label, defaultValue }) {
  return (
    // <Editor
    // initialValue="<p>This is the initial content of the editor.</p>"
    // init = {
    //     {
    //         branding: false,
    //         height: 500,
    //         menubar: true,
    //         plugins: [
    //             'advlist autolink lists link image charmap print preview anchor',
    //             'searchreplace visualblocks code fullscreen',
    //             'insertdatetime media table paste code help wordcount'
    //         ],
    //         toolbar: 'undo redo | styleselect | bold italic backcolor | \
    //             alignleft aligncenter alignright alignjustify | \
    //             bullist numlist outdent indent | link image | \
    //             code fullscreen | help',
    //     }
    // }
    // />

    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          // is editor comoponent me jab bhi onChange call hoga, tab ye react-hook-form ke control ko update karega
          <Editor
            apiKey={conf.tinyMCEapiKey}
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
