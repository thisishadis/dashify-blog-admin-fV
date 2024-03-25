


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  // State for User and password
  const [User, setUser] = useState('');
  const [password, setPassword] = useState('');

  // Handle registration function
  const handleRegister = async () => {
    try {
      // Replace 'YOUR_TOKEN_HERE' with your actual token
      const yourToken = 'your_actual_token_value';

      // Fetch data with the provided token
      const response = await fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${yourToken}`,
        },
      });

      // Check if the response is successful (status code 2xx)
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Handle the response data as needed
      } else {
        // Handle error scenarios
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div className="w-80 flex flex-col justify-center items-center gap-3 p-4 bg-gray-100">
        <h3 className="text-3xl text-gray-500">Register</h3>

        {/* User input */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">User</span>
          </div>
          <input
            type="text"
            value={User}
            onChange={(e) => setUser(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
        </label>

        {/* Password input */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
        </label>

        {/* Submit button */}
        <button className="btn w-full btn-primary btn-sm mt-2" onClick={handleRegister}>
          Register
        </button>

        {/* Already registered */}
        <div className="flex gap-3 text-xs w-full">
          <p>Already Registered?</p>
          <button
            className="font-bold"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const navigate = useNavigate();

//   return (
//     <div className="w-full flex items-center justify-center h-screen">
//       <div className="w-80 flex flex-col justify-center items-center gap-3 p-4 bg-gray-100">
//         <h3 className="text-3xl text-gray-500">Register</h3>
        
//         {/* next */}
//         <label className="form-control w-full max-w-xs">
//           <div className="label">
//             <span className="label-text">User</span>
//           </div>
//           <input
//             type="text"
//             //   placeholder="Type here"
//             className="input input-bordered w-full max-w-xs"
//             />
//         </label>
//         {/* password */}
//         <label className="form-control w-full max-w-xs">
//           <div className="label">
//             <span className="label-text">password</span>
//           </div>
//           <input
//             type="text"
//             //   placeholder="Type here"
//             className="input input-bordered w-full max-w-xs"
//             />
//         </label>
//         {/* submit btn */}
//         <button className="btn w-full btn-primary btn-sm mt-2"  onClick={handleRegister}>Register</button>
//         {/* next */}
//         <div className="flex gap-3 text-xs w-full">
//           <p>Already Registered?</p>
//           <button
//             className="font-bold"
//             onClick={() => {
//               navigate("/login");
//             }}
//           >
//             Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
