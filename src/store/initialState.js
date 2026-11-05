export const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
    fetchRequestId: null,
    mutationRequests: {},
  },
  filter: '',
  token: null,
  isLoggedIn: false,
};
