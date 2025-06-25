import React from "react";
import appWriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-900 rounded-xl p-4 text-gray-400 hover:scale-105 transition-transform duration-200 max-lg:w-full  max-lg:p-0.5 ">
        <div className="w-full justify-center mb-4 max-lg:mb-0">
          <img
            src={appWriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl object-cover max-lg:pl-1 max-lg:pr-1 max-lg:pt-1 min-lg:h-48"
            // style={{ height: "200px", objectFit: "cover" }}
          />
        </div>
        <h2 className="text-xl font-bold max-lg:text-xs text-center max-lg:pb-1">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;
