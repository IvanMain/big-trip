const FormConfig = {
  EDIT: {
    mode: 'edit',
    isRollupButton: true,
    submitTextButton: 'Save',
    resetTextButton: 'Delete',
  },
  ADD: {
    mode: 'add',
    isRollupButton: false,
    submitTextButton: 'Save',
    resetTextButton: 'Cancel',
    data: {
      point: {
        basePrice: 0,
        type: 'flight',
        dateFrom: null,
        dateTo: null
      },
    }
  },
};

export { FormConfig };
