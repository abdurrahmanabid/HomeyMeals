import React, { useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import {FaCheckCircle,FaEnvelope,FaGraduationCap,FaMapMarkerAlt,FaPhone,FaUser,} from "react-icons/fa";
import { TfiMapAlt } from "react-icons/tfi";
import useAuth from "../utils/useAuth";
import Modal from "./Modal";
import ProfileEdit from "./ProfileEdit";
import SetLocation from "./SetLocation";

const ProfileDetails = () => {
  const [modal, setModal] = useState(false);
  const [mapModal, setMapModal] = useState(false);
  const [moreDetails, setMoreDetails] = useState(null);
  const [mapDetails, setMapDetails] = useState(null);

  const profileData = useAuth();

  // Filter to only include specific keys
  const filteredProfileData = Object.keys(profileData)
    .filter((key) => ["fullName", "email", "phone", "role"].includes(key))
    .reduce((obj, key) => {
      obj[key] = profileData[key];
      return obj;
    }, {});

  const handleClick = () => {
    setModal(true);
  };

  return (
    <div className=" w-full flex flex-col bg-accent5 text-primary">
      <div className="flex-grow container mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 md:items-center">
        {/* Profile Picture Section */}
        <div className="md:col-span-1 p-6 rounded-xl text-center ">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-accent4 shadow-lg flex items-center justify-center">
            <FaUser size={64} className="text-secondary" />
          </div>
          <h2 className="text-2xl font-bold">{profileData.fullName}</h2>
          <p className="text-sm opacity-70">{profileData.role}</p>
        </div>

        {/* Profile Details Section */}
        <div className="md:col-span-2 space-y-4">
          {Object.entries(filteredProfileData).map(([key, value]) => {
            const icons = {
              fullName: <FaUser size={24} className="text-secondary" />,
              email: <FaEnvelope size={24} className="text-secondary" />,
              phone: <FaPhone size={24} className="text-secondary" />,
              role: <FaGraduationCap size={24} className="text-secondary" />,
            };

            return (
              <div
                key={key}
                className="flex items-center p-4 rounded-lg bg-accent4 text-primary"
              >
                <div className="mr-4">{icons[key]}</div>
                <div>
                  <p className="text-sm font-medium opacity-70 capitalize">
                    {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                  </p>
                  <p className="text-lg font-semibold">{value}</p>
                </div>
              </div>
            );
          })}

          {/* More Details Section */}
          {moreDetails && (
            <div className="space-y-4">
              <div className="flex items-center p-4 rounded-lg bg-accent4 shadow-lg">
                <FaMapMarkerAlt size={24} className="text-secondary mr-4" />
                <div>
                  <p className="text-sm font-medium opacity-70">Location</p>
                  <p className="text-lg font-semibold">
                    {`${moreDetails.upazilla}, ${moreDetails.district}, ${moreDetails.division}`}
                  </p>
                </div>
              </div>

              {moreDetails.description && (
                <div className="flex items-center p-4 rounded-lg bg-accent4 shadow-lg">
                  <CgDetailsMore size={24} className="text-secondary mr-4" />
                  <div>
                    <p className="text-sm font-medium opacity-70">
                      Description
                    </p>
                    <p className="text-lg font-semibold">
                      {moreDetails.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          {mapDetails && (
            <div className="flex items-center p-4 rounded-lg bg-accent4 shadow-lg">
              <TfiMapAlt size={24} className="text-secondary mr-4" />
              <div>
                <p className="text-sm font-medium opacity-70">Map Location</p>
                <p className="text-lg font-semibold">
                  {`Lat : ${mapDetails.lat}, Lng : ${mapDetails.lng}`}
                </p>
              </div>
            </div>
          )}

          <div className="w-full p-6">
            {!moreDetails && (
              <button
                className="w-full py-4 rounded-lg flex items-center justify-center font-bold text-lg transition-all hover:opacity-90 bg-primary text-accent5"
                onClick={handleClick}
              >
                <FaCheckCircle className="mr-3" />
                Set Your Full Profile
              </button>
            )}
            {!mapDetails && moreDetails && (
              <button
                className="w-full py-4 rounded-lg flex items-center justify-center font-bold text-lg transition-all hover:opacity-90 bg-primary text-accent5"
                onClick={() => {
                  setMapModal(true);
                }}
              >
                <FaCheckCircle className="mr-3" />
                Set Your Map Location
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Profile Editing */}
      {modal && !moreDetails && (
        <Modal
          title="Set Your Profile"
          handleModalClose={() => setModal(false)}
          size="xxl"
        >
          <ProfileEdit data={setMoreDetails} />
        </Modal>
      )}
      {mapModal && !mapDetails && (
        <Modal
          title="Set Your Profile"
          handleModalClose={() => setMapModal(false)}
          size="xxl"
        >
          <SetLocation data={setMapDetails} />
        </Modal>
      )}
    </div>
  );
};

export default ProfileDetails;
