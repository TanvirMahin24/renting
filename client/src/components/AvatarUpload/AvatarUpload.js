import React, { useState } from "react";
import Avatar from "react-avatar-edit";
import { Button } from "react-bootstrap";
import defaultAvatar from "../../assets/default_avatar.png";
import styles from "./AvatarUpload.module.css";

const AvatarUpload = ({ modals }) => {
  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(defaultAvatar);
  const onClose = () => {
    setPreview(defaultAvatar);
  };

  const onCrop = (prev) => {
    setPreview(prev);
  };

  const onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 2000000) {
      alert("File is too big!");

      elem.target.value = "";
    }
  };
  return (
    <div className="text-center">
      <div className={`text-center ${styles.avt}`}>
        <Avatar
          width={390}
          height={295}
          onCrop={onCrop}
          onClose={onClose}
          onBeforeFileLoad={onBeforeFileLoad}
          src={src}
        />
        <img src={preview} alt="Preview" className={styles.img} />
      </div>
      <Button className="btn_primary mt-3">Save</Button>
    </div>
  );
};

export default AvatarUpload;
