// export const selectContacts = state => state.contacts.item;
// export const getIsLoading = state => state.tasks.isLoading;
// export const getError = state => state.tasks.error;
// export const selectFilter = state => state.filter;

export const getContacts = state => state.contacts.items;

export const getIsLoading = state => state.contacts.isLoading;

export const getError = state => state.contacts.error;

export const getFilter = state => state.filter;
