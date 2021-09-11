const defaultState = {
  statusLogin: false,
  listUser: [],
};

const authReducer = (state = defaultState, action) => {
  const { type, payload } = action;
  console.log("STATE AUTH ===>", state);
  console.log("ACTION ===>", payload);
  switch (type) {
    case "LOGIN":
      return {
        //saya menggunakan ...state agar tidak menghapus data yang lama lama
        ...state,
        statusLogin: true,
      };
    case "REGISTER":
      return {
        ...state,
        listUser: [...state.listUser, payload.newUser],
      };
    case "LOGOUT":
      return defaultState;
    default:
      return state;
  }
};

export default authReducer;
