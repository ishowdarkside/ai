/* eslint-disable react/prop-types */
import { useGeneratorContext } from "../../../../context/GeneratorContext";
import { convertByte } from "../convertByte";
import { useFileContext } from "../../../../context/fileContext";
import { useState } from "react";
import { saveAiImage } from "../../../../services/images";
import { useQueryClient } from "@tanstack/react-query";
export default function OutputElement({ image }) {
  const { setSelectedBackground, selectedBackground } = useFileContext();
  const { setBackgroundByte } = useGeneratorContext();
  const [isSaved, setIsSaved] = useState(false);
  const queryClient = useQueryClient();
  return (
    <div
      onClick={async () => {
        setSelectedBackground(image.tmp_url);
        await convertByte(selectedBackground, setBackgroundByte);
      }}
      style={{ backgroundImage: `url(${image.tmp_url})` }}
    >
      {!isSaved && (
        <button
          onClick={async (e) => {
            e.stopPropagation();
            await saveAiImage(`${image.tmp_url}`);
            queryClient.invalidateQueries(["folders"]);
            setIsSaved(true);
          }}
        >
          Save image to folder
        </button>
      )}
    </div>
  );
}
