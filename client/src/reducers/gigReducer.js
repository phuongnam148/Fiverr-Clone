export const INITIAL_STATE = {
  userID: JSON.parse(localStorage.getItem("currentUser"))?._id,
  title: "",
  category: "",
  cover: "",
  images: [],
  desc: "",
  shortTitle: "",
  shortDesc: "",
  deliveryTimes: 0,
  revisionNumber: 0,
  features: [],
  price: 0,
};

export const gigReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "ADD_IMAGES":
      return {
        ...state,
        cover: action.payload.cover,
        images: action.payload.images,
      };
    case "ADD_FEATURE":
      return {
        ...state,
        features: [...state.features, action.payload],
      };
    case "REMOVE_FEATURE":
      return {
        ...state,
        features: state.features.filter(
          (feature) => feature !== action.payload
        ), // giữ lại tất cả feature trừ  action.payload
      };
    case "REMOVE_IMAGE":
      return {
        ...state,
        images: state.images.filter((feature) => feature !== action.payload), // giữ lại tất cả feature trừ  action.payload
      };
    default:
      return state;
  }
};
