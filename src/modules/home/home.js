import apiClient from "../../utils/apiClient";

const ERROR = "modules/home/ERROR";
const GETWHAT_AUTOCOMPLETE_START = 'modules/home/GETWHAT_AUTOCOMPLETE_START';
const GETWHAT_AUTOCOMPLETE_SUCCESS = 'modules/home/GETWHAT_AUTOCOMPLETE_SUCCESS';
const GETWHERE_AUTOCOMPLETE_START = 'modules/home/GETWHERE_AUTOCOMPLETE_START';
const GETWHERE_AUTOCOMPLETE_SUCCESS = 'modules/home/GETWHERE_AUTOCOMPLETE_SUCCESS';
const SET_WHAT_TEXT = 'modules/home/SET_WHAT_TEXT';
const SET_WHERE_TEXT = 'modules/home/SET_WHERE_TEXT';

const getInitialState = () => ({
  error: {
    title: '',
    message: '',
  },
  whatData: [],
  whereData: [],
  whatText: "",
  whereText: "",
});

const displayError = (title, message, loading = 'loading') => ({
  type: ERROR,
  title,
  message,
  loading,
});

export const setWhatText = (whatText) => ({
  type: SET_WHAT_TEXT,
  whatText,
});

export const setWhereText = (whereText) => ({
  type: SET_WHERE_TEXT,
  whereText,
});

export const getWhatAutocompleteData = (inputValue) => async (dispatch, getState) => {

  let url = apiClient.Urls.getwhatAutocomplete + `?what=${inputValue}`;

  dispatch({
    type: GETWHAT_AUTOCOMPLETE_START,
  });

  try {
    const response = await apiClient.get(url);

    dispatch({
      type: GETWHAT_AUTOCOMPLETE_SUCCESS,
      whatData: response,
    })
  } catch (e) {
    dispatch(displayError('EXCEPTION', e.message));
  }
};

export const getWhereAutocompleteData = (inputValue) => async (dispatch, getState) => {

  let url = apiClient.Urls.getwhereAutocomplete + `?where=${inputValue}`;

  dispatch({
    type: GETWHERE_AUTOCOMPLETE_START,
  });

  try {
    const response = await apiClient.get(url);

    dispatch({
      type: GETWHERE_AUTOCOMPLETE_SUCCESS,
      whereData: response,
    })
  } catch (e) {
    dispatch(displayError('EXCEPTION', e.message));
  }
};

export const getSearchResultsData = (origin = 'client') => async (dispatch, getState) => {
  const state = getState();
  const { whatText, whereText, } = state.home;

  if (!whatText && origin === 'client') return;

  dispatch({
    type: GETWHERE_AUTOCOMPLETE_START,
  });

  try {
    const response = await apiClient.post(apiClient.Urls.getSearchResults, {
      What: whatText,
      Where: whereText,
      TypeOfSearch: "search",
      PageNumber: 1
    });

    console.log('getSearchResultsData', response);

    dispatch({
      type: GETWHERE_AUTOCOMPLETE_SUCCESS,
      whereData: response,
    })
  } catch (e) {
    console.log('EXCEPTION', e.message);
    dispatch(displayError('EXCEPTION', e.message));
  }
};

export default function (state = getInitialState(), action) {
  switch (action.type) {
    case ERROR: {
      return {
        ...state,
        [action.loading]: false,
        error: {
          title: action.title,
          message: action.message,
        }
      }
    };
    case GETWHAT_AUTOCOMPLETE_SUCCESS: {
      return {
        ...state,
        whatData: action.whatData,
      }
    };
    case GETWHERE_AUTOCOMPLETE_SUCCESS: {
      return {
        ...state,
        whereData: action.whereData,
      }
    };
    case SET_WHAT_TEXT: {
      return {
        ...state,
        whatText: action.whatText
      }
    };
    case SET_WHERE_TEXT: {
      return {
        ...state,
        whereText: action.whereText
      }
    };

    default:
      return state;
  }
};