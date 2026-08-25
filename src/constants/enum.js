const Message = {
  EMPTY: 'Click New Event to create your first point',
  LOADING: 'Loading...',
  FAILED: 'Failed to load latest route information',
};


const FormConfig = {
  EDIT: {
    mode: 'edit',
    showOffers: true,
    showGallery: false,
    isRollupButton: true,
    submitTextButton: 'Save',
    resetTextButton: 'Delete',
  },
  ADD: {
    mode: 'add',
    showOffers: true,
    showGallery: true,
    isRollupButton: false,
    submitTextButton: 'Save',
    resetTextButton: 'Cancel',
  },
};

export {
  Message,
  FormConfig,
};
