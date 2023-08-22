// import { useState } from "react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const AddMembers = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [reminder, setReminder] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  // const onSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!name) {
  //     alert("Please add a member's name");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("image", image); // Append the image to the form data

  //   // Upload the image to the server and get the URL
  //   try {
  //     const response = await fetch("YOUR_UPLOAD_IMAGE_API_URL", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await response.json();
  //     setImageUrl(data.imageUrl); // Store the image URL
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //   }
  //   const newMember = {
  //     name,
  //     title,
  //     reminder,
  //     image: imageUrl,
  //     // image: image ? URL.createObjectURL(image) : null, // Use the image URL if available
  //   };

  //   onAdd(newMember);

  //   setName("");
  //   setTitle("");
  //   setReminder(false);
  //   setImage(null);
  //   setImageUrl("");
  // };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      alert("Please add a member's name");
      return;
    }

    const formData = new FormData();
    formData.append("image", image); // Append the image to the form data

    try {
      const response = await fetch("YOUR_UPLOAD_IMAGE_API_URL", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setImageUrl(data.imageUrl); // Store the image URL

      const newMember = {
        name,
        title,
        reminder,
        image: imageUrl, // Use the image URL from the server
      };

      onAdd(newMember);

      setName("");
      setTitle("");
      setReminder(false);
      setImage(null);
      setImageUrl("");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="arrow-link" style={{ width: "40px" }}>
        <Link to="/">
          <FaArrowLeft
            style={{
              fontSize: "10px",
              width: "100%",
              height: "100%",
              color: "#164b60",
            }}
          />
        </Link>
      </div>
      <div className="profile-picture-container">
        {imageUrl ? (
          <img src={imageUrl} alt="Profile" className="profile-picture" />
        ) : (
          <img
            src={require("../image/background.png")} // Replace with the actual path to your placeholder image
            alt=""
            className="placeholder-image"
          />
        )}
        <label htmlFor="profile-picture" className="profile-picture-label">
          <input
            type="file"
            id="profile-picture"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />{" "}
          <div className="add-icon">+</div>
        </label>
      </div>

      <div className="form-control">
        <input
          type="text"
          placeholder="Full names"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <input type="submit" value="Add Member" className="btn btn-block" />
    </form>
  );
};

export default AddMembers;

// const AddMembers = ({ onAdd }) => {
//   const [text, setText] = useState("");
//   const [day, setDay] = useState("");
//   const [reminder, setReminder] = useState(false);
//   const [image, setImage] = useState(null);
//   const onSubmit = (e) => {
//     e.preventDefault();

//     if (!text) {
//       alert("please add a member");
//       return;
//     }

//     onAdd({ text, day, reminder, image });

//     setText("");
//     setDay("");
//     setReminder(false);
//     setImage(null);
//   };

//   return (
//     <form className="add-form" onSubmit={onSubmit}>
//       {/* <h1>Hello</h1> */}
//       <div className="form-control">
//         <input
//           type="text"
//           placeholder="Full names"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//       </div>
//       <div className="form-control">
//         <input
//           type="text"
//           placeholder="Job Title"
//           value={day}
//           onChange={(e) => setDay(e.target.value)}
//         />
//       </div>

//       <input type="submit" value="Add Member" className="btn btn-block" />
//     </form>
//   );
// };

// export default AddMembers;
