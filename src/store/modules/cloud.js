// initial state
// shape: [{ id, quantity }]
import Profile from "@/classes/Profile";

const state = function () {
  return {
    profiles: [],
    profilesPendingUpload: [new Profile({ name: "Test profile 1" })]
  };
};

// getters
const getters = {
  getProfiles(state) {
    console.log(state.profilesPendingUpload);
    return state.profiles.concat(state.profilesPendingUpload);
  }
};

// actions
const actions = {
  async createNewProfile({ dispatch, commit, state }, newProfile) {
    state.profilesPendingUpload.push(newProfile);
    console.log("pushed", newProfile);
  },
  async editExistingProfilePoints(
    { state, dispatch },
    [newProfile, profileDatetime]
  ) {
    newProfile.datetime = profileDatetime;
    dispatch("createNewProfile", newProfile);
  }
};

// mutations
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {}
};
