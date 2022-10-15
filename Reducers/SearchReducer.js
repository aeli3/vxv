export const INITIAL_STATE = {
    ticker: 'TSLA',
    summary: {
        sentiment: {
            value: false,
            message: "",
        },
        news: {
            value: false,
            message: "News sentiment is negative",
        },
        earnings: {
            value: false,
            message: "",
        },
        insiders: {
            value: false,
            message: "",
        },
    },
}

export const SearchReducer = (state, action) => {
    switch(action.type) {
        case "SUCCESS": 
            return {
                ...state,
                ticker: action.payload,
            }
        case "SUMMARY":
            return {
            ...state,
            ...{
                summary: {
                    ...state.summary,
                    ...action.payload
                }
            }
        }

        default:
            return state
        }
    }