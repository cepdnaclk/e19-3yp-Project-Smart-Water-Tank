import React from 'react';
import '../style/login.css';
import AuthService from '../../services/AuthServices';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading } from '../../redux/alertsSlice'; 
import { hideLoading } from '../../redux/alertsSlice';


export default function Register() {

  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const onSubmit = async(event) => {
    event.preventDefault();
    const fullName = event.target.fullName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    console.log('Received values from form:', { fullName, email, password, confirmPassword });

    try {
      dispatch(showLoading())
      if (password === confirmPassword) {
        const registrationResult = await AuthService.register(
          fullName,
          email,
          password,
          
        );
        dispatch(hideLoading())

        if (registrationResult.success) {
          toast.success(registrationResult.message);
        
          setTimeout(() => {
            toast("Redirecting to login page");
            navigate('/login');
          }, 2000);
        }else{
          toast.error(registrationResult.message)
        }
        
      }else{
        toast.error("Passwords do not match");
        
      }
      

    } catch (error) {
      dispatch(hideLoading())

      console.error('Registration error:', error);
    }
  };

  return (
    <div>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6 img-col">
              <img src="./assets/images/main.png" className="img-fluid" alt="" />
            </div>
            <div className="col-md-7 col-lg-4 col-xl-4 offset-xl-1 form_input">
              <form onSubmit={onSubmit}>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form1Example1"
                    className="form-control form-control-lg"
                    name="fullName"
                  />
                  <label className="form-label" htmlFor="form1Example13">
                    Full Name
                  </label>
                </div>

                {/* Email input */}
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form1Example2"
                    className="form-control form-control-lg"
                    name="email"
                  />
                  <label className="form-label" htmlFor="form1Example13">
                    Email address
                  </label>
                </div>

                {/* Password input */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form1Example3"
                    className="form-control form-control-lg"
                    name="password"
                  />
                  <label className="form-label" htmlFor="form1Example23">
                    Password
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form1Example4"
                    className="form-control form-control-lg"
                    name="confirmPassword"
                  />
                  <label className="form-label" htmlFor="form1Example23">
                    Confirm Password
                  </label>
                </div>

                <div className="d-flex align-items-right mb-4">
                  <a href="/login">Already have an account?</a>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block w-100"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
