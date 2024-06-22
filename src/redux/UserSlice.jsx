import {createSlice} from '@reduxjs/toolkit';

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    data: [],
  },
  reducers: {
    addUsers(state, action) {
      state.data.push(action.payload);
    },
    updateUser(state, action) {
      let temp = state.data;
      temp.map((item, index) => {
        if (index == action.payload.index) {
          item.firstName = action.payload.firstName;
          item.lastName = action.payload.lastName;
        }
      });
      state.data = temp;
    },
    deleteUser(state, action) {
      let temp = state.data;
      let final = temp.filter((item, index) => {
        return index != action.payload;
      });
      state.data = final;
    },
  },
});
export const {addUsers, updateUser, deleteUser} = UserSlice.actions;
export default UserSlice.reducer;
