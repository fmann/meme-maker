import React, { useRef, useState, useEffect } from "react";

const ImageEditor = () => {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);
  const [imageWidth, setImageWidth] = useState(null);
  const [line1Text, setLine1Text] = useState("");
  const [line1X, setLine1X] = useState();
  const [line1Y, setLine1Y] = useState();
  const [line2Text, setLine2Text] = useState("");
  const [line2X, setLine2X] = useState();
  const [line2Y, setLine2Y] = useState();
  const [textColor, setTextColor] = useState("white");
  const [textSize, setTextSize] = useState(72);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        setImageHeight(img.height);
        setImageWidth(img.width);
        ctx.drawImage(img, 0, 0);
      };
      setImage(img);
      setLine1X(30);
      setLine1Y(100);
      setLine2X(30);
    };

    reader.readAsDataURL(file);
  };

  const addTextToImage = (text, x_pos, y_pos, text_2, x_pos_2, y_pos_2) => {
    if (!image) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    ctx.font = textSize + "px impact";
    ctx.strokeStyle = textColor === "white" ? "black" : "white";
    ctx.lineWidth = 8;

    ctx.strokeText(text, x_pos, y_pos);
    ctx.fillStyle = textColor;
    ctx.fillText(text, x_pos, y_pos);

    ctx.strokeText(text_2, x_pos_2, y_pos_2);
    ctx.fillStyle = textColor;
    ctx.fillText(text_2, x_pos_2, y_pos_2);
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "modified-image.png";
    link.click();
  };

  useEffect(() => {
    setLine2Y(imageHeight - 100);
  }, [imageHeight]);

  useEffect(() => {
    addTextToImage(line1Text, line1X, line1Y, line2Text, line2X, line2Y);
  }, [
    line1Text,
    line1X,
    line1Y,
    line2Text,
    line2X,
    line2Y,
    textColor,
    textSize,
    addTextToImage,
  ]);

  return (
    <div className="flex justify-center max-w-5xl mt-8 space-x-8">
      <div>
        <canvas className="max-w-lg" ref={canvasRef}></canvas>
      </div>
      <div className="flex flex-col max-w-80 space-y-4">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <div>
          <div className="flex space-x-4 items-center">
            <label htmlFor="line_1">Line 1</label>
            <input
              name="line_1"
              type="text"
              className="p-2 border border-gray-300 rounded"
              placeholder="Line 1"
              value={line1Text}
              onChange={(event) => setLine1Text(event.target.value)}
            />
          </div>
          <div className="flex space-x-4 items-center">
            <label htmlFor="x_pos">X Position</label>
            <input
              name="x_pos"
              type="range"
              className="p-2 border border-gray-300 rounded"
              min="1"
              max={imageWidth}
              value={line1X}
              onChange={(event) => setLine1X(event.target.value)}
            />
          </div>
          <div className="flex space-x-4 items-center">
            <label htmlFor="y_pos">Y Position</label>
            <input
              name="y_pos"
              type="range"
              className="p-2 border border-gray-300 rounded"
              min="1"
              max={imageHeight}
              value={line1Y}
              onChange={(event) => setLine1Y(event.target.value)}
            />
          </div>

          <div className="flex space-x-4 items-center">
            <label htmlFor="line_1">Line 2</label>
            <input
              name="line_2"
              type="text"
              className="p-2 border border-gray-300 rounded"
              placeholder="Line 2"
              value={line2Text}
              onChange={(event) => setLine2Text(event.target.value)}
            />
          </div>
          <div className="flex space-x-4 items-center">
            <label htmlFor="x_pos">X Position</label>
            <input
              name="x_pos"
              type="range"
              className="p-2 border border-gray-300 rounded"
              min="1"
              max={imageWidth}
              value={line2X}
              onChange={(event) => setLine2X(event.target.value)}
            />
          </div>
          <div className="flex space-x-4 items-center">
            <label htmlFor="y_pos">Y Position</label>
            <input
              name="y_pos"
              type="range"
              className="p-2 border border-gray-300 rounded"
              min="1"
              max={imageHeight}
              value={line2Y}
              onChange={(event) => setLine2Y(event.target.value)}
            />
          </div>

          <div className="flex space-x-4 items-center">
            <label htmlFor="fontSize">Text size</label>
            <input
              name="fontSize"
              type="range"
              className="p-2 border border-gray-300 rounded"
              min="1"
              max="200"
              value={textSize}
              onChange={(event) => setTextSize(event.target.value)}
            />
          </div>

          <div className="flex space-x-4 items-center">
            <label htmlFor="text_color">Text Color</label>
            <div>
              <input
                type="radio"
                id="black"
                name="text_color"
                value="black"
                checked={textColor === "black"}
                onChange={() => setTextColor("black")}
              />
              <label className="pl-2" htmlFor="black">
                Black
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="white"
                name="text_color"
                value="white"
                checked={textColor === "white"}
                onChange={() => setTextColor("white")}
              />
              <label className="pl-2" htmlFor="white">
                White
              </label>
            </div>
          </div>
        </div>

        {image && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={saveImage}
          >
            Save Image
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageEditor;
