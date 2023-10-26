import { apiSlice } from "./apislice";

const USERS_ULR = "/api/users"

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_ULR}/auth`,
                method: "POST",
                body: data
            })
        })
    })
})

export const { useLoginMutation } = usersApiSlice