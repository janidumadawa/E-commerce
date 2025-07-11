// client/src/pages/AddAddress.jsx
import React, { useEffect } from "react";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import AddressImg from "../assets/Address.svg";

// Input field component
const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-yellow-500 focus:ring-yellow-500 transition mb-3"
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
  />
);

function AddAddress() {
  const { axios, user, navigate } = useAppContext();

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("api/address/add", { address });

      if (data.success) {
        toast.success("Address added successfully!");
        navigate("/cart");
      } else {
        toast.error(data.message || "Failed to add address");
        navigate("/cart");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, []);

  return (
    <div className="mt-16 pb-16 px-4 md:px-0">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping
        <span className="font-semibold text-yellow-500"> Address</span>
      </p>

      <div className="flex flex-col md:flex-row justify-between mt-10 gap-8">
        {/* Left Side - Form */}
        <div className="flex-1 max-w-md">
          <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="firstName"
                type="text"
                placeholder="First Name"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name="email"
              type="email"
              placeholder="Email Address"
            />

            <InputField
              handleChange={handleChange}
              address={address}
              name="street"
              type="text"
              placeholder="Street Address"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="city"
                type="text"
                placeholder="City"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="state"
                type="text"
                placeholder="State/Province"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="zipCode"
                type="text"
                placeholder="ZIP/Postal Code"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="country"
                type="text"
                placeholder="Country"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name="phone"
              type="tel"
              placeholder="Phone Number"
            />

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2.5 px-4 rounded transition mt-4"
            >
              Save Address
            </button>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="flex-1 flex items-center justify-center">
          <img
            className="max-w-md w-full h-auto scale-230"
            src={AddressImg}
            alt="add address"
          />
        </div>
      </div>
    </div>
  );
}

export default AddAddress;
