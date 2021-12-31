import { authActions } from "../Reducer/Auth";

export const loginCheck = (loginData, navigate) => async (dispatch) => {
  try {
    const fetchedData = await fetchUserData();

    //finding user by data provided by loginForm
    const user = fetchedData.find((user) => user.username === loginData.email);

    if (!user) {
      throw new Error("User does not exist!");
    } else {
      if (user.password !== loginData.password) {
        throw new Error("Password is incorrect!");
      } else {
        dispatch(authActions.login(user));
        navigate("/products");
      }
    }
  } catch (err) {
    dispatch(authActions.authError(err.message));
  }
};

//function for fetching user data from dummy api
const fetchUserData = async () => {
  const response = await fetch(
    "https://6193976ed3ae6d0017da86a1.mockapi.io/api/user_profile"
  );
  if (!response.ok) {
    throw new Error("Could not fetch cart data!");
  }
  const apiData = await response.json();
  return apiData;
};
