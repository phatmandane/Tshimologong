
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

const EditMember = ({ member, onEdit, onBack }) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [reminder, setReminder] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (member) {
      setName(member.name);
      setTitle(member.title);
      setReminder(member.reminder);
      setImage(member.image ? new File([member.image], "profile.jpg") : null);
    }
  }, [member]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      alert("Please add a member's name");
      return;
    }

    const updatedMember = {
      name,
      text: title,
      reminder,
      image: image ? URL.createObjectURL(image) : null,
    };

    onEdit(member.id, updatedMember);
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
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="Profile"
            className="profile-picture"
          />
        ) : (
          <img
            src={require("../image/background.png")} 
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

export default EditMember;

