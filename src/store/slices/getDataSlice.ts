import { buildCreateSlice, asyncThunkCreator} from "@reduxjs/toolkit";

export interface IData {
    usersData: [{
        id: number;
        firstName: string;
        lastName: string;
        age: number
    }],
    loading: boolean;
    error: string
}

const initialState: IData = {
    usersData: [{
        id: 0,
        firstName: '',
        lastName: '',
        age: 0
    }],
    loading: false,
    error: ''
}

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator }
})

export const getDataSlice = createSliceWithThunk({
    name: "data",
    initialState,
    selectors: {
        dataState: (state) => state
    },
    reducers: (create) => ({
        fetchData: create.asyncThunk(
            async (_, { rejectWithValue }: any) => {
                try {
                    const response = await fetch(`https://fakeapi.extendsclass.com/peoples`);
                    if (!response.ok) {
                        return rejectWithValue("Не удалось загрузить данные");
                    }
                    const data = await response.json();
                    return {data};
                } catch (err) {
                    return rejectWithValue(err);
                }
            },
            {
                pending: (state) => {
                    state.loading = true;
                    state.error = "";
                },
                fulfilled: (state, action) => {
                    const { data } = action.payload;
                    state.usersData = data;
                    state.error = "";
                },
                rejected: (state, action) => {
                    state.error = action.payload as string;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
    )})
})

export const { fetchData } = getDataSlice.actions;
export const { dataState } = getDataSlice.selectors;
export default getDataSlice.reducer;