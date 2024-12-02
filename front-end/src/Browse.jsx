import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Browse() {
  const [workerAccounts, setWorkerAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleViewProfile = (profile) => {
    setSelectedProfile(profile);
    setShowModal(!showModal);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9999/api/worker_accounts"
        );
        console.log(response);
        setWorkerAccounts(response.data.worker_accounts);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[#ffffff] w-[100%] h-[100vh]">
      <div className="flex flex-wrap">
        {workerAccounts.map((current, index) => (
          <div
            key={index}
            className="rounded-lg bg-[#171717] text-[#eaeaea] w-[200px] h-[200px] flex flex-col justify-center items-center m-[1rem] p-[1rem]"
          >
            <img
              className="border rounded-full object-cover object-center w-[50%] h-[50%] overflow-hidden"
              src={`http://localhost:9999/photos/${current.user_profile_photo_path}`}
              alt={current.user_name}
            />
            <div className="text-[1rem] font-bold">{current.user_name}</div>
            <div className="font-thin">{current.address}</div>
            <input
              className="bg-[#eaeaea] p-[0.3rem] rounded-lg text-[black] cursor-pointer"
              type="button"
              value="View Profile"
              onClick={() => handleViewProfile(current)}
            />
          </div>
        ))}
      </div>

      {showModal && selectedProfile && (
        <div className="bg-[#0000007d] w-[100%] h-[100%] fixed top-0 left-0 z-[9999]">
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[10000] bg-white p-[1rem] rounded-lg">
            <h2 className="text-[1.5rem] font-bold">
              {selectedProfile.user_name}
            </h2>
            <div className="font-medium mt-[1rem]">
              <p>
                <strong>Email:</strong> {selectedProfile.user_email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedProfile.phone_number}
              </p>
              <p>
                <strong>Address:</strong> {selectedProfile.address}
              </p>
              <p>
                <strong>Gender:</strong> {selectedProfile.gender}
              </p>
              <p>
                <strong>DOB:</strong>{" "}
                {new Date(selectedProfile.dob).toLocaleDateString()}
              </p>
            </div>
            <input
              className="cursor-pointer bg-[white] mt-[1rem] p-[0.5rem] rounded-lg"
              type="button"
              value="Back"
              onClick={() => setShowModal(!showModal)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
