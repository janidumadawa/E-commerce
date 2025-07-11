// client/src/components/seller/SellerLogin.jsx
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function SellerLogin() {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const {data} = await axios.post("/api/seller/login", {
        email,
        password,
      });
      if(data.success) {
        setIsSeller(true);
        toast.success("Login successful");
        navigate("/seller");
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }    
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  return (
  !isSeller && (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form
        className="flex flex-col gap-5 w-full max-w-sm p-8 rounded-lg shadow-xl border border-gray-200 bg-white"
        onSubmit={onSubmitHandler}
      >
        <p className="text-2xl font-medium text-center w-full">
          <span className="text-yellow-500">Seller</span>
          <span className="text-gray-700"> Login</span>
        </p>

        <div className="w-full">
          <p className="mb-1 text-sm font-medium">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 outline-yellow-500"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p className="mb-1 text-sm font-medium">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 outline-yellow-500"
            type="password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 transition-all text-white w-full py-2 rounded-md cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  )
);

}

export default SellerLogin;
