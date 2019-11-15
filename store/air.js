export const state=()=>{
    return {
        searchHistory:[]
    }
}


export const mutations={
    setSearchHistory(state,data){

        if(state.searchHistory.length===5) state.searchHistory.pop();
            

        state.searchHistory.unshift(data);
        

    }
}