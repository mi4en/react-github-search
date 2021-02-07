import { SET_ALERT, CLEAR_ALERT } from '../types';

const reducer = (state, action) => {
	switch (action.type) {
		case SET_ALERT:
			return action.payload;
		case CLEAR_ALERT:
			return null;
		default:
			return state;
	}
};

export default reducer;
